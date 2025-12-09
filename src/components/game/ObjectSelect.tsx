import { motion } from "motion/react";
import { Apple, Star, Heart, Circle } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

export type GameObject = "apple" | "star" | "heart" | "ball";

interface ObjectSelectProps {
  onSelect: (object: GameObject) => void;
  onBack: () => void;
}

const objects: { id: GameObject; nameKey: keyof typeof import("../../lib/translations").translations.en; icon: any; color: string; bgColor: string }[] = [
  { id: "apple", nameKey: "apples", icon: Apple, color: "text-red-600", bgColor: "bg-red-100" },
  { id: "star", nameKey: "stars", icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { id: "heart", nameKey: "hearts", icon: Heart, color: "text-pink-600", bgColor: "bg-pink-100" },
  { id: "ball", nameKey: "balls", icon: Circle, color: "text-blue-600", bgColor: "bg-blue-100" },
];

export default function ObjectSelect({ onSelect, onBack }: ObjectSelectProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-white mb-4">{t("chooseObject")}</h1>
          <p className="text-white/90">{t("chooseObjectSubtext")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {objects.map((obj, index) => {
            const Icon = obj.icon;
            return (
              <motion.button
                key={obj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(obj.id)}
                className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`${obj.bgColor} rounded-2xl p-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-16 h-16 ${obj.color}`} strokeWidth={2} />
                  </div>
                  <p className="text-slate-700">{t(obj.nameKey)}</p>
                </div>
              </motion.button>
            );
          })}
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