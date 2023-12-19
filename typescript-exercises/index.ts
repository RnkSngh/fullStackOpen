import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello full stack! ");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(400).send();
  }
  res.json({
    weight,
    height,
    bmi: calculateBmi({ weight: Number(weight), height: Number(height) }),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  const dailyExercises = daily_exercises as string[];
  dailyExercises.forEach((arg: string) => {
    if (isNaN(Number(arg))) {
      res.status(400).json({ error: "malformatted paramaters" });
    }
  });
  if (isNaN(Number(target))) {
    res.status(400).json({ error: "malformatted paramaters" });
  }

  res.json(
    calculateExercise({
      target: Number(target),
      dailyHours: dailyExercises.map((exercises) => Number(exercises)),
    })
  );
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
