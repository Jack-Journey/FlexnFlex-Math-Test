import { CharacterType } from "../../lib/types";
import FloCharacter from "../FloCharacter";
import FlexCharacter from "../FlexCharacter";
import Shadow from "../../imports/Shadow";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

interface CharacterSelectProps {
  onSelect: (character: CharacterType) => void;
}

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-white mb-4">Choose your math buddy</h1>
          <p className="text-white/90">{t("pickCharacterSubtext")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Flo Character */}
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect("flo")}
            className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-purple-400/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <FloCharacter state="smile" className="w-48 h-48 md:w-64 md:h-64" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4">
                  <Shadow />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-purple-600 group-hover:text-purple-700 text-[32px] font-bold">Flo</h2>
              </div>
            </div>
          </motion.button>

          {/* Flex Character */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect("flex")}
            className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-pink-400/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <FlexCharacter state="smile" className="w-48 h-48 md:w-64 md:h-64" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4">
                  <Shadow />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-pink-600 group-hover:text-pink-700 text-[32px] font-bold">Flex</h2>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Language Switcher at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <LanguageSwitcher />
        </motion.div>
      </div>
    </div>
  );
}