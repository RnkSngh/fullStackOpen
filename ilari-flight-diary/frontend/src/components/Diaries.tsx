import { DiaryEntry } from "../../types";

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>
            date: {diary.date} weather: {diary.weather} visibility:{" "}
            {diary.visibility}
          </p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Diaries;
