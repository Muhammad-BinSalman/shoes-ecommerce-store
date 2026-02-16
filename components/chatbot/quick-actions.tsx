"use client";

import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  Ruler,
  Package,
  RotateCcw,
  MessageCircle,
  MoreHorizontal,
  Info,
} from "lucide-react";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const actions = [
    {
      icon: ImageIcon,
      label: "Find shoes",
      action: "find-shoes",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      icon: Ruler,
      label: "Size guide",
      action: "size-guide",
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
    },
    {
      icon: Package,
      label: "Track order",
      action: "track-order",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
    },
    {
      icon: RotateCcw,
      label: "Return policy",
      action: "returns",
      color: "bg-pink-50 text-pink-600 hover:bg-pink-100",
    },
    {
      icon: MessageCircle,
      label: "Support",
      action: "support",
      color: "bg-amber-50 text-amber-600 hover:bg-amber-100",
    },
    {
      icon: Info,
      label: "About Us",
      action: "about-us",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((item) => (
        <Button
          key={item.action}
          variant="ghost"
          className={`h-auto py-4 px-3 flex flex-col items-center gap-2 rounded-xl transition-all ${item.color}`}
          onClick={() => onActionClick(item.action)}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs font-medium whitespace-nowrap">
            {item.label}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
