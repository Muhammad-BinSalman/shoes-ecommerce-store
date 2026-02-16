import ChatToggleButton from "./chat-toggle-button";
import ColorOrb from "./color-orb";

export default function Chatbot() {
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden w-full max-w-4xl flex-col md:flex">
        <div className="mb-8 flex justify-center">
          <ColorOrb
            dimension="120px"
            tones={{
              base: "oklch(95% 0.02 264.695)",
              accent1: "oklch(75% 0.15 350)",
              accent2: "oklch(80% 0.12 200)",
              accent3: "oklch(78% 0.14 280)",
            }}
          />
        </div>
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-5xl font-bold text-gray-900">
            Chat Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Click the chat icon to start a conversation
          </p>
        </div>
      </div>

      <ChatToggleButton />
    </div>
  );
}
