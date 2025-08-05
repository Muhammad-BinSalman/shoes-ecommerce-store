"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/cart-context";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { toast } from 'sonner';

const COD_FEE = 350;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateCartItem, clearCart } = useCart();
  console.log(cart?.lines[0]?.merchandise.product);
  interface FormFields {
    country: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode?: string;
    email: string;
    phone: string;
  }
  interface ErrorFields {
    country?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    apartment?: string;
    city?: string;
    postalCode?: string;
    email?: string;
    phone?: string;
  }
  interface CartLine {
    merchandise: {
      product: {
        title: string;
        featuredImage?: { url: string };
      };
    };
    quantity: number;
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  }

  const [form, setForm] = useState<FormFields>({
    country: "Pakistan",
    firstName: "",
    lastName: "", // now optional
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorFields>({});

  if (!cart || !cart.lines || cart.lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <ShoppingCartIcon className="w-24 h-24 mb-8" />
        <h2 className="text-4xl font-bold mb-8">Your cart is empty</h2>
        <Link
          className="mt-2 px-6 py-2 bg-[#313e44] font-medium text-white rounded hover:bg-gray-800"
          href={"/"}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const cartSubtotal = cart.cost?.subtotalAmount?.amount
    ? parseInt(cart.cost.subtotalAmount.amount)
    : 0;
  const grandTotal = cartSubtotal + COD_FEE;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs: ErrorFields = {};
    if (!form.country) errs.country = "Country/Region is required";
    if (!form.firstName) errs.firstName = "First name is required";
    // Last name is optional
    if (!form.address) errs.address = "Address is required";
    if (!form.city) errs.city = "City is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.phone) errs.phone = "Phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Helper to check if all required fields are filled
  const isFormValid = () => {
    return (
      form.country.trim() !== '' &&
      form.firstName.trim() !== '' &&
      // Last name is optional
      form.address.trim() !== '' &&
      form.city.trim() !== '' &&
      form.email.trim() !== '' &&
      form.phone.trim() !== ''
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Send to Google Sheets
      const sheetRes = await fetch("/api/save-order-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            ...form,
            name: `${form.firstName}${form.lastName ? ' ' + form.lastName : ''}`.trim(),
          },
          items: cart.lines.map((line) => ({
            image: line.merchandise.product.featuredImage?.url,
            name: line.merchandise.product.title,
            quantity: line.quantity,
            price: line.cost.totalAmount.amount,
            currency: line.cost.totalAmount.currencyCode
          })),
          codFee: COD_FEE,
          total: grandTotal
        })
      });
      if (!sheetRes.ok) {
        setLoading(false);
        const data = await sheetRes.json();
        alert(data.error ? `Order failed (Sheets): ${data.error}` : "Order failed. Please try again.");
        return;
      }
      // Send email
      const emailRes = await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            ...form,
            name: `${form.firstName}${form.lastName ? ' ' + form.lastName : ''}`.trim(),
          },
          items: cart.lines.map((line) => ({
            image: line.merchandise.product.featuredImage?.url,
            name: line.merchandise.product.title,
            qty: line.quantity,
            price: line.cost.totalAmount.amount,
            currency: line.cost.totalAmount.currencyCode
          })),
          codFee: COD_FEE,
          total: grandTotal
        })
      });
      if (!emailRes.ok) {
        setLoading(false);
        const data = await emailRes.json();
        alert(data.error ? `Order failed (Email): ${data.error}` : "Order failed. Please try again.");
        return;
      }
      // Both succeeded
      toast.success('Order confirmed!', {
        description: 'Thank you for your purchase. We have received your order.',
      });
      // Forcibly clear cart state and cookie
      import('react').then(({ startTransition }) => {
        startTransition(() => {
          clearCart();
        });
      });
      import("@/lib/clear-cart-cookie").then(({ clearCartCookie }) => {
        clearCartCookie();
      });
      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 200);

    } catch (err) {
      setLoading(false);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] w-full max-w-5xl mx-auto py-8 gap-8">
      {/* Left: Form */}
      <div className="md:w-3/5 w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Country/Region */}
          <div>
            {/* <Label htmlFor="country">Country/Region</Label> */}
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country/Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Countries</SelectLabel>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.country && <p className="text-red-500 text-xs mt-1 ">{errors.country}</p>}
          </div>
          {/* First and Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <Label htmlFor="firstName">First name (optional)</Label>
              <Input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                autoComplete="given-name"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <Label htmlFor="lastName">Last name (optional)</Label>
              <Input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                autoComplete="family-name"
              />
              {/* No error for last name, since it's optional */}
            </div>
          </div>
          {/* Address */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              autoComplete="address-line1"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          {/* Apartment, suite, etc. */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input
              id="apartment"
              name="apartment"
              value={form.apartment}
              onChange={handleChange}
              autoComplete="address-line2"
            />
          </div>
          {/* City and Postal Code */}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <Label htmlFor="postalCode">Postal code (optional)</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                autoComplete="postal-code"
              />
            </div>
          </div>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
              inputMode="numeric"
              pattern="^[0-9]{10,15}$"
              minLength={10}
              maxLength={15}
              placeholder="e.g. 03001234567"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div className="bg-neutral-100 rounded p-4 flex items-center justify-between">
            <span className="font-medium">Payment</span>
            <span className="text-black font-semibold">Cash on Delivery (PKR 350)</span>
          </div>
          <button
            type="submit"
            className="w-full bg-[#313e44] text-white py-3 rounded-sm cursor-pointer font-semibold mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || !isFormValid()}
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        </form>
      </div>
      {/* Right: Cart Summary */}
      <div className="md:w-2/5 w-full bg-neutral-50 rounded-lg shadow p-6 h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          {(cart.lines as CartLine[]).map((line, idx) => (
            <div key={idx} className="flex items-center gap-3 border-b pb-3">
              <div className="w-16 h-16 relative rounded overflow-hidden border">
                {line.merchandise.product.featuredImage?.url && (
                  <Image
                    src={line.merchandise.product.featuredImage.url}
                    alt={line.merchandise.product.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{line.merchandise.product.title}</div>
                <div className="text-xs text-gray-500">Qty: {line.quantity}</div>
              </div>
              <div className="font-semibold">PKR {parseInt(line.cost.totalAmount.amount).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>PKR {cartSubtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>COD Fee</span>
            <span>PKR {COD_FEE.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Grand Total</span>
            <span>PKR {grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
