import { motion } from "motion/react";
import { NumberRange } from "../../lib/gameLogic";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

interface RangeSelectProps {
  onSelect: (range: NumberRange) => void;
  onBack: () => void;
}

const ranges: { 
  range: NumberRange; 
  label: string; 
  descKey: keyof typeof import("../../lib/translations").translations.en;
  difficultyKey: keyof typeof import("../../lib/translations").translations.en;
  color: string;
}[] = [
  { 
    range: { min: 1, max: 5 }, 
    label: "1 - 5", 
    descKey: "easyDesc",
    difficultyKey: "easy",
    color: "from-green-400 to-green-500"
  },
  { 
    range: { min: 1, max: 10 }, 
    label: "1 - 10", 
    descKey: "mediumDesc",
    difficultyKey: "medium",
    color: "from-blue-400 to-blue-500"
  },
  { 
    range: { min: 1, max: 20 }, 
    label: "1 - 20", 
    descKey: "hardDesc",
    difficultyKey: "hard",
    color: "from-orange-400 to-orange-500"
  },
  { 
    range: { min: 1, max: 50 }, 
    label: "1 - 50", 
    descKey: "expertDesc",
    difficultyKey: "expert",
    color: "from-purple-400 to-purple-500"
  },
];

export default function RangeSelect({ onSelect, onBack }: RangeSelectProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-white mb-4">{t("chooseRange")}</h1>
          <p className="text-white/90">{t("chooseRangeSubtext")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ranges.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(item.range)}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer group overflow-hidden relative"
            >
              <div className={`inline-block bg-gradient-to-br ${item.color} text-white px-8 py-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-3xl">{item.label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-between max-w-xl mx-auto"
        >
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all"
          >
            ← {t("back")}
          </button>
          <LanguageSwitcher />
        </motion.div>
      </div>
    </div>
  );
}