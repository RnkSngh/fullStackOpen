interface BmiMeasurement {
  weight: number;
  height: number;
}

export const calculateBmi = (measurements: BmiMeasurement) => {
  if (measurements.height === 0) {
    throw new Error("cannot divide by 0");
  }
  const bmi = measurements.weight / (measurements.height / 100) ** 2;
  switch (true) {
    case bmi <= 16:
      return "Underweight (severe thinness)";
    case bmi <= 16.9:
      return "Underweight (Moderate thinness)";
    case bmi <= 18.4:
      return "Underweight (mild thinness)";
    case bmi <= 24.9:
      return "normal";
    case bmi <= 29.9:
      return "Overweight (pre-obease)";
    case bmi <= 34.9:
      return "Obese (class I )";
    case bmi <= 39.9:
      return "Obese (class II )";
    case bmi > 40:
      return "Obese (class III )";
    default:
      throw new Error("couldn't calculate bmi");
  }
};
