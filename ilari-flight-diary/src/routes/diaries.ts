import express from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry } from "../../types";
import toNewDiaryEntry from "../utils";
const diariesRouter = express.Router();

diariesRouter.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveDiaryEntries());
});

diariesRouter.post("/", (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body as unknown);
    const newDiary: DiaryEntry = diaryService.addDiary(newDiaryEntry);
    res.json(newDiary);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong";
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

diariesRouter.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (!diary) {
    res.sendStatus(400);
  }
  res.send(diary);
});

export default diariesRouter;
