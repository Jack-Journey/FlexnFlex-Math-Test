import { useState } from "react";
import { CharacterType } from "./lib/types";
import { MathOperation, NumberRange } from "./lib/gameLogic";
import CharacterSelect from "./components/game/CharacterSelect";
import ObjectSelect, { GameObject } from "./components/game/ObjectSelect";
import OperationSelect from "./components/game/OperationSelect";
import RangeSelect from "./components/game/RangeSelect";
import GameScreen from "./components/game/GameScreen";
import ResultsScreen from "./components/game/ResultsScreen";
import { LanguageProvider } from "./contexts/LanguageContext";
import OfflineIndicator from "./components/pwa/OfflineIndicator";
import UpdateNotification from "./components/pwa/UpdateNotification";
import SyncStatus from "./components/pwa/SyncStatus";

type GameStep = 
  | "character"
  | "object"
  | "operation"
  | "range"
  | "game"
  | "results";

export default function App() {
  const [step, setStep] = useState<GameStep>("character");
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [object, setObject] = useState<GameObject | null>(null);
  const [operation, setOperation] = useState<MathOperation | null>(null);
  const [range, setRange] = useState<NumberRange | null>(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleCharacterSelect = (char: CharacterType) => {
    setCharacter(char);
    setStep("object");
  };

  const handleObjectSelect = (obj: GameObject) => {
    setObject(obj);
    setStep("operation");
  };

  const handleOperationSelect = (op: MathOperation) => {
    setOperation(op);
    setStep("range");
  };

  const handleRangeSelect = (r: NumberRange) => {
    setRange(r);
    setStep("game");
  };

  const handleGameComplete = (score: number) => {
    setFinalScore(score);
    setStep("results");
  };

  const handlePlayAgain = () => {
    // Keep character and restart from object selection
    setStep("object");
    setObject(null);
    setOperation(null);
    setRange(null);
    setFinalScore(0);
  };

  const handleGoHome = () => {
    // Reset everything
    setStep("character");
    setCharacter(null);
    setObject(null);
    setOperation(null);
    setRange(null);
    setFinalScore(0);
  };

  const handleBack = (previousStep: GameStep) => {
    setStep(previousStep);
  };

  // Render current step with language provider and switcher
  const renderStep = () => {
    switch (step) {
      case "character":
        return <CharacterSelect onSelect={handleCharacterSelect} />;

      case "object":
        return (
          <ObjectSelect
            onSelect={handleObjectSelect}
            onBack={() => handleBack("character")}
          />
        );

      case "operation":
        return (
          <OperationSelect
            onSelect={handleOperationSelect}
            onBack={() => handleBack("object")}
          />
        );

      case "range":
        return (
          <RangeSelect
            onSelect={handleRangeSelect}
            onBack={() => handleBack("operation")}
          />
        );

      case "game":
        if (!character || !object || !operation || !range) {
          // Safety check - shouldn't happen
          setStep("character");
          return null;
        }
        return (
          <GameScreen
            character={character}
            object={object}
            operation={operation}
            range={range}
            onComplete={handleGameComplete}
            onExit={handleGoHome}
          />
        );

      case "results":
        if (!character) {
          // Safety check
          setStep("character");
          return null;
        }
        return (
          <ResultsScreen
            character={character}
            score={finalScore}
            totalQuestions={20}
            onPlayAgain={handlePlayAgain}
            onHome={handleGoHome}
          />
        );

      default:
        return null;
    }
  };

  return (
    <LanguageProvider>
      <OfflineIndicator />
      <UpdateNotification />
      <SyncStatus />
      {renderStep()}
    </LanguageProvider>
  );
}