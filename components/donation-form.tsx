"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DonationForm() {
  const [pairs, setPairs] = useState(1);
  const PRICE_PER_PAIR = 850;

  const donationOptions = [
    { label: "1 Pair", value: 1 },
    { label: "5 Pairs", value: 5 },
    { label: "10 Pairs", value: 10 },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const totalAmount = pairs * PRICE_PER_PAIR;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          pairs,
          amount: totalAmount,
        }),
      });

      if (response.ok) {
        setOpen(false);
        toast.success("Thank you! Our team will contact you for receipts.");
        setName("");
        setPhone("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-orange-100 sticky top-24">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Make a Donation</h3>
        <p className="text-gray-500 mt-2">Sponsor school shoes for children</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Quantity
          </label>
          <div className="grid grid-cols-3 gap-3">
            {donationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPairs(option.value)}
                className={`py - 3 px - 2 rounded - xl text - sm font - semibold transition - all border - 2 ${pairs === option.value
                  ? "border-primary-olive bg-primary-olive text-white shadow-md transform scale-105"
                  : "border-gray-100 bg-gray-50 text-gray-600 hover:border-primary-olive/50 hover:bg-white"
                  } `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF8F0] p-4 rounded-xl flex justify-between items-center border border-orange-100">
          <span className="text-gray-700 font-medium">Total Donation</span>
          <span className="text-2xl font-bold text-primary-olive">
            Rs. {totalAmount.toLocaleString()}
          </span>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="w-full text-lg h-14 bg-primary-olive hover:bg-primary-olive/90 text-white rounded-xl shadow-lg transition-all"
            >
              <Heart className="w-5 h-5 mr-2 fill-white" />
              Donate Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Your Donation</DialogTitle>
              <DialogDescription>
                Please transfer <strong>Rs. {totalAmount.toLocaleString()}</strong>{" "}
                to the account below and confirm your details.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 my-2">
              <h4 className="font-semibold text-primary-olive mb-2 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> JazzCash 
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Title:</span>
                  <span className="font-medium text-gray-900">
                    SALMAN AHMED 
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-mono font-bold text-gray-900 bg-white px-2 rounded border border-orange-100">
                    03315777066
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Your WhatsApp / Phone</Label>
                <Input
                  id="phone"
                  placeholder="0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary-olive hover:bg-primary-olive/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Notifying Team...
                    </>
                  ) : (
                    "I Have Donated"
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Click after you have sent the payment.
                </p>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
          <CreditCard className="w-3 h-3" />
          <span>Secure Payment Integration</span>
        </div>
      </div>
    </div>
  );
}

