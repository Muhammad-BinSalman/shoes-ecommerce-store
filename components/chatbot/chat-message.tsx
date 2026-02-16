import { cn } from "@/lib/utils";
import { Response } from "@/components/ui/response";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2",
        isBot ? "justify-start" : "justify-end",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isBot
            ? "bg-[hsl(var(--chat-bot-bg))] text-[hsl(var(--chat-bot-fg))]"
            : "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-fg))]",
        )}
      >
        {isBot ? (
          <Response className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </Response>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        )}
        <span className="text-xs opacity-60 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
