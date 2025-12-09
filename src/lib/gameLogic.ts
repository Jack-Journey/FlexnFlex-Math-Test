/**
 * Game Logic Utilities
 * Handles math problem generation and answer validation
 */

export type MathOperation = "addition" | "subtraction" | "multiplication" | "division";

export interface NumberRange {
  min: number;
  max: number;
}

export interface MathProblem {
  num1: number;
  num2: number;
  operation: MathOperation;
  correctAnswer: number;
  options: number[];
}

/**
 * Generates a random number within a range
 */
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a math problem based on operation and range
 */
export function generateProblem(
  operation: MathOperation,
  range: NumberRange
): MathProblem {
  let num1: number;
  let num2: number;
  let correctAnswer: number;

  switch (operation) {
    case "addition":
      num1 = getRandomNumber(range.min, range.max);
      num2 = getRandomNumber(range.min, range.max);
      correctAnswer = num1 + num2;
      break;

    case "subtraction":
      // Ensure positive results
      num1 = getRandomNumber(range.min, range.max);
      num2 = getRandomNumber(range.min, num1);
      correctAnswer = num1 - num2;
      break;

    case "multiplication":
      num1 = getRandomNumber(range.min, range.max);
      num2 = getRandomNumber(range.min, range.max);
      correctAnswer = num1 * num2;
      break;

    case "division":
      // Ensure even division
      num2 = getRandomNumber(Math.max(1, range.min), range.max);
      correctAnswer = getRandomNumber(range.min, range.max);
      num1 = num2 * correctAnswer;
      break;

    default:
      num1 = 0;
      num2 = 0;
      correctAnswer = 0;
  }

  // Generate multiple choice options
  const options = generateOptions(correctAnswer, range);

  return {
    num1,
    num2,
    operation,
    correctAnswer,
    options,
  };
}

/**
 * Generates 4 multiple choice options including the correct answer
 */
function generateOptions(correctAnswer: number, range: NumberRange): number[] {
  const options = new Set<number>();
  options.add(correctAnswer);

  while (options.size < 4) {
    // Generate options within a reasonable range of the correct answer
    const offset = getRandomNumber(-10, 10);
    const option = Math.max(0, correctAnswer + offset);
    if (option !== correctAnswer) {
      options.add(option);
    }
  }

  // Shuffle the options
  return Array.from(options).sort(() => Math.random() - 0.5);
}

/**
 * Gets the operation symbol for display
 */
export function getOperationSymbol(operation: MathOperation): string {
  const symbols = {
    addition: "+",
    subtraction: "-",
    multiplication: "×",
    division: "÷",
  };
  return symbols[operation];
}

/**
 * Formats the problem as a string
 */
export function formatProblem(problem: MathProblem): string {
  const symbol = getOperationSymbol(problem.operation);
  return `${problem.num1} ${symbol} ${problem.num2}`;
}
