import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CharacterType, CharacterState } from "../../lib/types";
import FloCharacter from "../FloCharacter";
import FlexCharacter from "../FlexCharacter";
import Shadow from "../../imports/Shadow";
import { Progress } from "../ui/progress";
import { Apple, Star, Heart, Circle } from "lucide-react";
import { 
  MathProblem, 
  NumberRange, 
  MathOperation,
  generateProblem,
  formatProblem
} from "../../lib/gameLogic";
import { GameObject } from "./ObjectSelect";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

interface GameScreenProps {
  character: CharacterType;
  object: GameObject;
  operation: MathOperation;
  range: NumberRange;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const TOTAL_QUESTIONS = 20;

export default function GameScreen({
  character,
  object,
  operation,
  range,
  onComplete,
  onExit,
}: GameScreenProps) {
  const { t } = useLanguage();
  const [characterState, setCharacterState] = useState<CharacterState>("smile");
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Generate first problem on mount
  useEffect(() => {
    setCurrentProblem(generateProblem(operation, range));
  }, [operation, range]);

  // Reset character to smile after wrong answer
  useEffect(() => {
    if (feedback === "wrong") {
      const timer = setTimeout(() => {
        setCharacterState("smile");
        setFeedback(null);
        setSelectedAnswer(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleAnswerClick = (answer: number) => {
    if (feedback || !currentProblem) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentProblem.correctAnswer;

    if (isCorrect) {
      setCharacterState("correct");
      setFeedback("correct");
      setCorrectAnswers((prev) => prev + 1);

      // Move to next question after 2 seconds
      setTimeout(() => {
        if (currentQuestion >= TOTAL_QUESTIONS) {
          onComplete(correctAnswers + 1);
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setCurrentProblem(generateProblem(operation, range));
          setCharacterState("smile");
          setFeedback(null);
          setSelectedAnswer(null);
        }
      }, 2000);
    } else {
      setCharacterState("wrong");
      setFeedback("wrong");
    }
  };

  const getObjectIcon = () => {
    const icons = {
      apple: Apple,
      star: Star,
      heart: Heart,
      ball: Circle,
    };
    return icons[object];
  };

  const getObjectColor = () => {
    const colors = {
      apple: "text-red-500",
      star: "text-yellow-500",
      heart: "text-pink-500",
      ball: "text-blue-500",
    };
    return colors[object];
  };

  const CharacterComponent = character === "flo" ? FloCharacter : FlexCharacter;
  const ObjectIcon = getObjectIcon();
  const objectColor = getObjectColor();

  const progress = (correctAnswers / TOTAL_QUESTIONS) * 100;

  if (!currentProblem) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex flex-col p-4">
      {/* Header with Progress */}
      <div className="w-full max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <Progress value={progress} className="h-3 flex-1" />
          <div className="text-white whitespace-nowrap">
            {currentQuestion} {t("of")} {TOTAL_QUESTIONS}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Character */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <CharacterComponent 
                  state={characterState} 
                  className="w-48 h-48 md:w-64 md:h-64" 
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4">
                  <Shadow />
                </div>
              </div>
              <div className="text-white mt-4 capitalize text-[32px] font-bold">{character}</div>
              
              {/* Feedback Message */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`
                      mt-4 p-4 rounded-2xl text-center
                      ${
                        feedback === "correct"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {feedback === "correct" 
                      ? t("correctFeedback")
                      : t("wrongFeedback")}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Problem & Answers */}
            <div className="md:col-span-2 space-y-6">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                {/* Visual representation with objects */}
                <div className="flex justify-center gap-2 mb-6 flex-wrap items-center">
                  {/* First number as objects */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {Array.from({ length: Math.min(currentProblem.num1, 10) }).map((_, i) => (
                      <ObjectIcon
                        key={`obj1-${i}`}
                        className={`w-8 h-8 ${objectColor}`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  
                  {/* Operation symbol */}
                  <div className="text-purple-600 text-3xl px-2">
                    {currentProblem.operation === "addition" && "+"}
                    {currentProblem.operation === "subtraction" && "-"}
                    {currentProblem.operation === "multiplication" && "×"}
                    {currentProblem.operation === "division" && "÷"}
                  </div>
                  
                  {/* Second number as objects */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {Array.from({ length: Math.min(currentProblem.num2, 10) }).map((_, i) => (
                      <ObjectIcon
                        key={`obj2-${i}`}
                        className={`w-8 h-8 ${objectColor}`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  
                  {/* Equals and question mark */}
                  <div className="text-purple-600 text-3xl px-2">= ?</div>
                </div>

                {/* Problem */}
                <div className="text-center mb-8">
                  <div className="text-slate-600 mb-2">{t("solve")}</div>
                  <div className="text-purple-600 text-4xl md:text-5xl">
                    {formatProblem(currentProblem)} = ?
                  </div>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-4">
                  {currentProblem.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: feedback ? 1 : 1.05 }}
                      whileTap={{ scale: feedback ? 1 : 0.95 }}
                      onClick={() => handleAnswerClick(option)}
                      disabled={feedback !== null}
                      className={`
                        py-6 px-8 rounded-2xl text-2xl transition-all
                        ${
                          selectedAnswer === option
                            ? feedback === "correct"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        }
                        ${feedback ? "cursor-not-allowed" : "cursor-pointer"}
                      `}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Button */}
      <div className="w-full max-w-4xl mx-auto mt-6">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          <button
            onClick={onExit}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-all"
          >
            {t("exit")}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}