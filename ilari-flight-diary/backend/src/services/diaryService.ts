import diaryData from "../../data/entries";
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from "../../types";

const diaries = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map((diary) => {
    delete diary.comment;
    return diary;
  });
};

const addDiary = (entry: NewDiaryEntry) => {
  const newDiary: DiaryEntry = {
    id: Math.max(...diaries.map((diary) => diary.id)) + 1,
    ...entry,
  };
  diaries.push(newDiary);
  return newDiary;
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find((diary) => diary.id === id);
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveDiaryEntries,
  findById,
};
