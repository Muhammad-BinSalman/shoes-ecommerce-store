"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Mic, Maximize2, Search } from "lucide-react";
import ColorOrb from "./color-orb";
import TypingIndicator from "./typing-indicator";
import QuickActions from "./quick-actions";
import ChatMessage from "./chat-message";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatInterfaceProps {
  onClose?: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleStreamingResponse = async (
    response: Response,
    userMessage: Message,
  ) => {
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let botMessageText = "";
    let botMessage: Message | null = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              botMessageText += data.text;

              // Create or update bot message
              if (!botMessage) {
                botMessage = {
                  id: (Date.now() + 1).toString(),
                  text: botMessageText,
                  isBot: true,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                };
                setMessages((prev) => [...prev, botMessage!]);
              } else {
                // Update existing message with streamed text
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessage!.id
                      ? { ...msg, text: botMessageText }
                      : msg,
                  ),
                );
              }
            }
          } catch (e) {
            // Skip parsing errors
          }
        }
      }
    }
  };

  const handleQuickAction = (action: string) => {
    setShowWelcome(false);

    const actionTexts: { [key: string]: string } = {
      "find-shoes": "Find shoes",
      "size-guide": "Size guide",
      "track-order": "Track order",
      returns: "Returns",
      support: "Support",
      "about-us": "About Us",
    };

    const staticResponses: { [key: string]: string } = {
      "find-shoes":
        "Sure, I can help with that. What kind of shoes are you looking for? (e.g., running shoes, sneakers, converses)",
      "size-guide":
        "We use EU standard sizing and cm insole length for accuracy. If you need more help, just let me know your measurements and I'll help you find the right size.",
      "track-order":
        "To track your order, please provide your tracking number.",
      returns:
        "We offer returns and exchanges for a period of 7 days from the date of purchase. To start a return, please provide your order number.",
      support: "Hello! I'm here to help. What do you need assistance with?",
      "about-us":
        "Hi thumb thrift is a pakistani platform for buying and selling thrifted branded shoes. We offer a wide range of styles and sizes to suit your needs. We are here to help you find the perfect pair of shoes for your needs in cheap prices.",
    };

    const userMessage: Message = {
      id: Date.now().toString(),
      text: actionTexts[action] || action,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: staticResponses[action] || "How can I help you?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setShowWelcome(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      await handleStreamingResponse(response, userMessage);
    } catch (error) {
      console.error("[v0] Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex flex-col h-[90vh] md:h-[600px] w-full md:w-[440px] shadow-2xl border rounded-3xl md:rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-end p-3 md:p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:bg-muted hidden md:block"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages or Welcome Screen */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
        {showWelcome && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-start h-full">
            <div className="mb-4 md:mb-6">
              <ColorOrb
                dimension="100px"
                tones={{
                  base: "oklch(95% 0.02 264.695)",
                  accent1: "oklch(75% 0.15 350)",
                  accent2: "oklch(80% 0.12 200)",
                  accent3: "oklch(78% 0.14 280)",
                }}
              />
            </div>

            {/* Welcome Text */}
            <h2 className="text-lg md:text-2xl font-semibold text-center mb-2">
              Hi there,
              <br />
              Welcome back! How can I help?
            </h2>

            <p className="text-xs md:text-sm text-muted-foreground text-center mb-6 md:mb-8 max-w-sm px-2">
              I'm here to help you with your thrift shoe shopping. Choose from
              the prompts below or just tell me what you need!
            </p>

            {/* Quick Actions */}
            <div className="w-full max-w-sm px-2">
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && messages[messages.length - 1]?.isBot === false && (
              <TypingIndicator />
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-3 md:p-4 border-t bg-white">
        <div className="flex items-center gap-2 mb-2 md:mb-3 px-3 md:px-4 py-2 md:py-3 border rounded-full bg-muted/30">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
            <Mic className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex items-center justify-between px-2 gap-1 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground h-8"
          >
            Thumb Thrift AI
          </Button>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-8"
            >
              Attach
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-8 hidden md:inline-flex"
            >
              Shortcuts
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
