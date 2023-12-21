import { useEffect, useState } from "react";
import "./App.css";
import Diaries from "./components/Diaries";
import { getAllDiaries } from "./services/diaryServices";
import { DiaryEntry } from "../types";
import NewDiary from "./components/NewDiary";
import Notification from "./components/Notification";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    getAllDiaries().then((res) => setDiaries(res));
  }, []);

  const addDiaries = (newDiary: DiaryEntry) => {
    setDiaries(diaries.concat(newDiary));
  };

  const notifyErr = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div>
      {notification && <Notification content={notification} />}
      <Diaries diaries={diaries} />
      <NewDiary notifyErr={notifyErr} addDiaries={addDiaries} />
    </div>
  );
}

export default App;
