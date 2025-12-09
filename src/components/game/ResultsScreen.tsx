import { motion } from "motion/react";
import { Trophy, Star, RotateCcw, Home } from "lucide-react";
import { CharacterType } from "../../lib/types";
import FloCharacter from "../FloCharacter";
import FlexCharacter from "../FlexCharacter";
import Shadow from "../../imports/Shadow";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect } from "react";
import { queueScore } from "../../lib/offlineSync";

interface ResultsScreenProps {
  character: CharacterType;
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

export default function ResultsScreen({
  character,
  score,
  totalQuestions,
  onPlayAgain,
  onHome,
}: ResultsScreenProps) {
  const { t } = useLanguage();
  const CharacterComponent = character === "flo" ? FloCharacter : FlexCharacter;
  const percentage = (score / totalQuestions) * 100;
  
  // Queue score for syncing (works offline)
  useEffect(() => {
    const saveScore = async () => {
      try {
        await queueScore({
          character,
          score,
          totalQuestions,
          operation: 'mixed', // You can pass this from GameScreen if needed
          range: 'mixed' // You can pass this from GameScreen if needed
        });
      } catch (error) {
        console.error('Failed to queue score:', error);
      }
    };
    
    saveScore();
  }, [character, score, totalQuestions]);
  
  const getPerformanceMessage = () => {
    if (percentage === 100) return t("perfectScore");
    if (percentage >= 80) return t("excellentWork");
    if (percentage >= 60) return t("greatJob");
    if (percentage >= 40) return t("goodEffort");
    return t("keepPracticing");
  };

  const getStarCount = () => {
    if (percentage === 100) return 3;
    if (percentage >= 60) return 2;
    if (percentage >= 30) return 1;
    return 0;
  };

  const stars = getStarCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Character Celebration */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative mb-4">
              <CharacterComponent 
                state={percentage >= 60 ? "correct" : "smile"} 
                className="w-48 h-48" 
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4">
                <Shadow />
              </div>
            </div>
            <h2 className="text-purple-600 capitalize">{character} {t("characterSays")}</h2>
          </motion.div>

          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-yellow-100 rounded-full p-6">
              <Trophy className="w-20 h-20 text-yellow-600" />
            </div>
          </motion.div>

          {/* Performance Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-slate-800 mb-4">{getPerformanceMessage()}</h1>
            <div className="text-purple-600 text-5xl mb-4">
              {score}/{totalQuestions}
            </div>
            <p className="text-slate-600">
              {t("percentCorrect").replace("{percent}", percentage.toFixed(0))}
            </p>
          </motion.div>

          {/* Star Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-8"
          >
            {[1, 2, 3].map((starNum) => (
              <motion.div
                key={starNum}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.5 + starNum * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <Star
                  className={`w-12 h-12 ${
                    starNum <= stars
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onPlayAgain}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              {t("playAgain")}
            </button>
            <button
              onClick={onHome}
              className="flex-1 bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-700 py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              {t("home")}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}