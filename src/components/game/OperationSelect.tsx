import { motion } from "motion/react";
import { Plus, Minus, X, Divide } from "lucide-react";
import { MathOperation } from "../../lib/gameLogic";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

interface OperationSelectProps {
  onSelect: (operation: MathOperation) => void;
  onBack: () => void;
}

const operations: { 
  id: MathOperation; 
  descKey: keyof typeof import("../../lib/translations").translations.en;
  icon: any; 
  color: string; 
  bgColor: string;
}[] = [
  { 
    id: "addition", 
    descKey: "additionDesc",
    icon: Plus, 
    color: "text-green-600", 
    bgColor: "bg-green-100"
  },
  { 
    id: "subtraction", 
    descKey: "subtractionDesc",
    icon: Minus, 
    color: "text-orange-600", 
    bgColor: "bg-orange-100"
  },
  { 
    id: "multiplication", 
    descKey: "multiplicationDesc",
    icon: X, 
    color: "text-purple-600", 
    bgColor: "bg-purple-100"
  },
  { 
    id: "division", 
    descKey: "divisionDesc",
    icon: Divide, 
    color: "text-blue-600", 
    bgColor: "bg-blue-100"
  },
];

export default function OperationSelect({ onSelect, onBack }: OperationSelectProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-white mb-4">{t("chooseOperation")}</h1>
          <p className="text-white/90">{t("chooseOperationSubtext")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operations.map((op, index) => {
            const Icon = op.icon;
            return (
              <motion.button
                key={op.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(op.id)}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className={`${op.bgColor} rounded-2xl p-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-12 h-12 ${op.color}`} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 text-left">
                    <h2 className="text-slate-800 mb-2">{t(op.id)}</h2>
                    <p className="text-slate-600">{t(op.descKey)}</p>
                  </div>
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