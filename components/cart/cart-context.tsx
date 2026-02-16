"use client";

import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "lib/shopify/types";
import React, {
  createContext,
  use,
  useContext,
  useMemo,
  useOptimistic,
} from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
    type: "UPDATE_ITEM";
    payload: { merchandiseId: string; updateType: UpdateType };
  }
  | {
    type: "ADD_ITEM";
    payload: { variant: ProductVariant; product: Product };
  }
  | {
    type: "CLEAR_CART";
  };

type CartContextType = {
  cartPromise: Promise<Cart | undefined>;
  socksState: {
    includeSocks: boolean;
    toggleSocks: () => void;
  };
  toteBagState: {
    includeToteBag: boolean;
    toggleToteBag: () => void;
  };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType,
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString(),
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product,
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.amount);

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

function updateCartTotals(
  lines: CartItem[],
): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0,
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD";

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case "CLEAR_CART":
      return createEmptyCart();
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = currentCart.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item,
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart.cost.totalAmount, amount: "0" },
          },
        };
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    case "ADD_ITEM": {
      const { variant, product } = action.payload;
      const existingItem = currentCart.lines.find(
        (item) => item.merchandise.id === variant.id,
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product,
      );

      const updatedLines = existingItem
        ? currentCart.lines.map((item) =>
          item.merchandise.id === variant.id ? updatedItem : item,
        )
        : [...currentCart.lines, updatedItem];

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    default:
      return currentCart;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const [includeSocks, setIncludeSocks] = React.useState(false);
  const [includeToteBag, setIncludeToteBag] = React.useState(false);

  const toggleSocks = () => {
    setIncludeSocks((prev) => !prev);
  };

  const toggleToteBag = () => {
    setIncludeToteBag((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cartPromise,
        socksState: {
          includeSocks,
          toggleSocks,
        },
        toteBagState: {
          includeToteBag,
          toggleToteBag
        }
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const initialCart = use(context.cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer,
  );

  const { includeSocks, toggleSocks } = context.socksState;
  const { includeToteBag, toggleToteBag } = context.toteBagState;

  // Apply add-ons calculations to the optimistic cart
  const finalCart = useMemo(() => {
    if (!optimisticCart) return optimisticCart;

    // If no add-ons are included, return basic cart
    if (!includeSocks && !includeToteBag) return optimisticCart;

    // Add-on prices
    const SOCKS_PRICE = 150;
    const TOTE_PRICE = 200;

    let additionalCost = 0;
    if (includeSocks) additionalCost += SOCKS_PRICE;
    if (includeToteBag) additionalCost += TOTE_PRICE;

    const currentSubtotal = Number(optimisticCart.cost.subtotalAmount.amount);
    const newSubtotal = currentSubtotal + additionalCost;

    return {
      ...optimisticCart,
      cost: {
        ...optimisticCart.cost,
        subtotalAmount: {
          ...optimisticCart.cost.subtotalAmount,
          amount: newSubtotal.toString()
        },
        totalAmount: {
          ...optimisticCart.cost.totalAmount,
          amount: newSubtotal.toString()
        }
      }
    };
  }, [optimisticCart, includeSocks, includeToteBag]);

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    updateOptimisticCart({
      type: "UPDATE_ITEM",
      payload: { merchandiseId, updateType },
    });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    updateOptimisticCart({ type: "ADD_ITEM", payload: { variant, product } });
  };

  const clearCart = () => {
    updateOptimisticCart({ type: "CLEAR_CART" });
  };

  return useMemo(
    () => ({
      cart: finalCart,
      updateCartItem,
      addCartItem,
      clearCart,
      includeSocks,
      toggleSocks,
      includeToteBag,
      toggleToteBag,
    }),
    [finalCart, includeSocks, toggleSocks, includeToteBag, toggleToteBag],
  );
}
