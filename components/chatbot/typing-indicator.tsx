const TypingIndicator = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="bg-[hsl(var(--chat-bot-bg))] rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
