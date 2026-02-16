"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import ColorOrb from "./color-orb";
import ChatInterface from "./chat-interface";

interface ChatToggleButtonProps {
  className?: string;
}

const ChatToggleButton = ({ className }: ChatToggleButtonProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check scroll position on initial render

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isChatOpen) {
    return <ChatInterface onClose={() => setIsChatOpen(false)} />;
  }

  return (
    <>
      {showButton && (
        <button
          onClick={() => setIsChatOpen(true)}
          className={clsx(
            "fixed bottom-4 right-4 z-50 flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-primary-olive to-black/90 linear-gradient px-4 text-white shadow-2xl transition-all duration-200 hover:scale-110 hover:bg-primary-olive/90 sm:h-14 sm:px-6",
            className,
          )}
        >
          <ColorOrb
            dimension="30px"
            spinDuration={15}
            tones={{
              base: "oklch(95% 0.02 264.695)",
              accent1: "oklch(95% 0.15 350)",
              accent2: "oklch(50% 0.12 200)",
              accent3: "oklch(68% 0.14 280)",
            }}
          />
          <span className="font-semibold text-sm">Ask AI</span>
        </button>
      )}
      {isChatOpen && (
        <div className="animate-in slide-in-from-bottom-40 duration-300 fixed z-50 bottom-0 md:inset-auto md:bottom-6 md:right-6 md:rounded-3xl">
          <ChatInterface onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </>
  );
};

export default ChatToggleButton;
