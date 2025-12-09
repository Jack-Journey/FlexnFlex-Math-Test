import FlexSmile from "../imports/FlexSmile";
import FlexCorrect from "../imports/FlexCorrect";
import FlexWrong from "../imports/FlexWrong";

export type FlexState = "smile" | "correct" | "wrong";

interface FlexCharacterProps {
  state: FlexState;
  className?: string;
}

export default function FlexCharacter({ state, className = "" }: FlexCharacterProps) {
  return (
    <div className={className}>
      {state === "smile" && <FlexSmile />}
      {state === "correct" && <FlexCorrect />}
      {state === "wrong" && <FlexWrong />}
    </div>
  );
}
