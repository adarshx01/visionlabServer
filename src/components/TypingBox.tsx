import { useAITeacher } from "@/hooks/useAITeacher";
import { useState } from "react";

export const TypingBox = () => {
  const askAI = useAITeacher((state) => state.askAI);
  const loading = useAITeacher((state) => state.loading);
  const conversationMode = useAITeacher((state) => state.conversationMode);
  const setConversationMode = useAITeacher((state) => state.setConversationMode);
  const [question, setQuestion] = useState("");

  const ask = () => {
    askAI(question);
    setQuestion("");
  };

  return (
    <div className="z-10 max-w-[600px] flex space-y-6 flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4 backdrop-blur-md rounded-xl border-slate-100/30 border">
      <div>
        <h2 className="text-white font-bold text-xl">
          Choose your conversation mode:
        </h2>
        <div className="flex space-x-4 mt-2">
          <button
            className={`px-4 py-2 rounded-full ${
              conversationMode === "hindiLearning"
                ? "bg-indigo-600 text-white"
                : "bg-white/20 text-white/80"
            }`}
            onClick={() => setConversationMode("hindiLearning")}
          >
            Hindi Learning
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              conversationMode === "hindiToEnglish"
                ? "bg-indigo-600 text-white"
                : "bg-white/20 text-white/80"
            }`}
            onClick={() => setConversationMode("hindiToEnglish")}
          >
            Hindi to English
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              conversationMode === "normalChat"
                ? "bg-indigo-600 text-white"
                : "bg-white/20 text-white/80"
            }`}
            onClick={() => setConversationMode("normalChat")}
          >
            Normal Chat
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-white font-bold text-xl">
          {conversationMode === "hindiLearning"
            ? "Learn Hindi"
            : conversationMode === "hindiToEnglish"
            ? "Translate Hindi to English"
            : "Chat in Hindi or English"}
        </h2>
        <p className="text-white/65">
          {conversationMode === "hindiLearning"
            ? "Type a sentence you want to say in Hindi."
            : conversationMode === "hindiToEnglish"
            ? "Type a Hindi sentence to translate to English."
            : "Type your message in Hindi or English."}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </div>
      ) : (
        <div className="gap-3 flex">
          <input
            className="focus:outline focus:outline-white/80 flex-grow bg-slate-800/60 p-2 px-4 rounded-full text-white placeholder:text-white/50 shadow-inner shadow-slate-900/60"
            placeholder={
              conversationMode === "hindiLearning"
                ? "Have you ever been to India?"
                : conversationMode === "hindiToEnglish"
                ? "क्या आप भारत गए हैं?"
                : "Type your message..."
            }
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ask();
              }
            }}
          />
          <button
            className="bg-slate-100/20 p-2 px-6 rounded-full text-white"
            onClick={ask}
          >
            Ask
          </button>
        </div>
      )}
    </div>
  );
};

