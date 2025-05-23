import { teachers, useAITeacher } from "@/hooks/useAITeacher";

export const BoardSettings = () => {
  const transliteration = useAITeacher((state) => state.transliteration);
  const setTransliteration = useAITeacher((state) => state.setTransliteration);

  const english = useAITeacher((state) => state.english);
  const setEnglish = useAITeacher((state) => state.setEnglish);

  const teacher = useAITeacher((state) => state.teacher);
  const setTeacher = useAITeacher((state) => state.setTeacher);

  const speech = useAITeacher((state) => state.speech);
  const setSpeech = useAITeacher((state) => state.setSpeech);

  const classroom = useAITeacher((state) => state.classroom);
  const setClassroom = useAITeacher((state) => state.setClassroom);

  return (
    <>
      <div className="absolute right-0 bottom-full flex flex-row gap-10 mb-20 ">
        {teachers.map((guru, idx) => (
          <div
            key={idx}
            className={`p-3 transition-colors duration-500 ${
              teacher === guru ? "bg-white/80" : "bg-white/40"
            }`}
          >
            <div onClick={() => setTeacher(guru)}>
              <img
                src={`/images/${guru}.jpg`}
                alt={guru}
                className="object-cover w-40 h-40"
              />
            </div>
            <h2 className="text-3xl font-bold mt-3 text-center">{guru}</h2>
          </div>
        ))}
      </div>
      <div className="absolute left-0 bottom-full flex flex-row gap-2 mb-20">
        <button
          className={` ${
            classroom === "default"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setClassroom("default")}
        >
          SciFi Lab
        </button>
        <button
          className={` ${
            classroom === "alternative"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setClassroom("alternative")}
        >
          Home Lab
        </button>
      </div>
      <div className="absolute left-0 top-full flex flex-row gap-2 mt-20">
        <button
          className={` ${
            speech === "formal"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setSpeech("formal")}
        >
          Formal
        </button>
        <button
          className={` ${
            speech === "casual"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setSpeech("casual")}
        >
          Casual
        </button>
      </div>
      <div className="absolute right-0 top-full flex flex-row gap-2 mt-20">
        <button
          className={` ${
            transliteration
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setTransliteration(!transliteration)}
        >
          Transliteration
        </button>
        <button
          className={`${
            english
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setEnglish(!english)}
        >
          English
        </button>
      </div>
    </>
  );
};

