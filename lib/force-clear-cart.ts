// import { useCart } from '@/components/cart/cart-context';

// /**
//  * Utility to forcibly clear the cart state from anywhere in the app.
//  * Call this after order confirmation to guarantee cart is empty.
//  */
// export function forceClearCart() {
//   // This works only in a React component or hook context
//   try {
//     const { clearCart } = useCart();
//     clearCart();
//   } catch (e) {
//     // fallback: wipe cartId cookie, reload page
//     document.cookie = 'cartId=; Max-Age=0; path=/;';
//     window.location.reload();
//   }
// }
