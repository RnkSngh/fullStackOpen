interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseData {
  target: number;
  dailyHours: number[];
}

const RATING_DESCRIPTIONS = {
  1: "Try harder next time",
  2: "Not bad, but could be better",
  3: "Met your goals! Way to go",
};

export const calculateExercise = ({
  dailyHours,
  target,
}: ExerciseData): ExerciseResult => {
  if (dailyHours.length === 0) {
    throw new Error("Training data is empty");
  }
  const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
  const rating = average >= target ? 3 : average >= target * 0.75 ? 2 : 1;
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((day) => day > 0).length,
    success: average >= target,
    rating,
    ratingDescription: RATING_DESCRIPTIONS[rating],
    target,
    average,
  };
};
