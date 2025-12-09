import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`px-4 py-2 rounded-full transition-all text-sm ${
          language === "en"
            ? "bg-white text-purple-600"
            : "text-white hover:bg-white/20"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("de")}
        className={`px-4 py-2 rounded-full transition-all text-sm ${
          language === "de"
            ? "bg-white text-purple-600"
            : "text-white hover:bg-white/20"
        }`}
      >
        DE
      </button>
    </div>
  );
}