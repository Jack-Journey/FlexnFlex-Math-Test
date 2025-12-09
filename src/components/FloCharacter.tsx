import FloSmile from "../imports/FloSmile";
import FloCorrect from "../imports/FloCorrect";
import FloWrong from "../imports/FloWrong";

export type FloState = "smile" | "correct" | "wrong";

interface FloCharacterProps {
  state: FloState;
  className?: string;
}

export default function FloCharacter({ state, className = "" }: FloCharacterProps) {
  return (
    <div className={className}>
      {state === "smile" && <FloSmile />}
      {state === "correct" && <FloCorrect />}
      {state === "wrong" && <FloWrong />}
    </div>
  );
}
