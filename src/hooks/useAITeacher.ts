import { create } from "zustand";

export const teachers = ["Swara","Dhruv"] as const;

type ConversationMode = "hindiLearning" | "hindiToEnglish" | "normalChat";

interface AITeacherState {
  messages: any[];
  currentMessage: any;
  loading: boolean;
  teacher: typeof teachers[number];
  speech: "formal" | "casual";
  english: boolean;
  transliteration: boolean;
  classroom: "default" | "alternative";
  conversationMode: ConversationMode;
  askAI: (question: string) => Promise<void>;
  playMessage: (message: any) => Promise<void>;
  setTeacher: (teacher: typeof teachers[number]) => void;
  setSpeech: (speech: "formal" | "casual") => void;
  setEnglish: (english: boolean) => void;
  setTransliteration: (transliteration: boolean) => void;
  setClassroom: (classroom: "default" | "alternative") => void;
  setConversationMode: (mode: ConversationMode) => void;
}

export const useAITeacher = create<AITeacherState>((set, get) => ({
  messages: [],
  currentMessage: null,
  loading: false,
  teacher: "Swara",
  speech: "formal",
  english: true,
  transliteration: true,
  classroom: "default",
  conversationMode: "hindiLearning",
  askAI: async (question) => {
    set({ loading: true });
    try {
      const res = await fetch(
        `/api/ai?question=${encodeURIComponent(question)}&speech=${get().speech}&mode=${get().conversationMode}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const message = { question, answer: data, speech: get().speech, mode: get().conversationMode };
      set((state) => ({ messages: [...state.messages, message] }));
      if (get().conversationMode === "hindiLearning") {
        await get().playMessage(message);
      }
    } catch (error) {
      console.error("Error asking AI:", error);
    } finally {
      set({ loading: false });
    }
  },
  playMessage: async (message) => {
    set({ currentMessage: message });
    try {
      const text = message.mode === "hindiLearning" 
        ? message.answer.hindi.map((w: any) => w.word).join("")
        : message.answer.text;
      const voice = get().teacher === "Swara" ? "21m00Tcm4TlvDq8ikWAM" : "AZnzlk1XvdvUeBnXmlld";
      const res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voice, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': 'sk_c1090d2ed061ca30fcb35e7ce22241c136d58c63863abbcb'
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      source.onended = () => {
        set({ currentMessage: null });
      };
    } catch (error) {
      console.error("Error playing message:", error);
      set({ currentMessage: null });
    }
  },
  
  setTeacher: (teacher) => set({ teacher }),
  setSpeech: (speech) => set({ speech }),
  setEnglish: (english) => set({ english }),
  setTransliteration: (transliteration) => set({ transliteration }),
  setClassroom: (classroom) => set({ classroom }),
  setConversationMode: (mode) => set({ conversationMode: mode }),
}));

