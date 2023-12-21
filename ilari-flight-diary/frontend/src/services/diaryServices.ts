import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../../types";

const baseUrl = "http://localhost:3001/api";

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(`${baseUrl}/diaries`).then((res) => res.data);
};

export const submitNewDiary = (newDiaryEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${baseUrl}/diaries`, newDiaryEntry)
    .then((res) => res.data);
};
