import { useState } from "react";
import { submitNewDiary } from "../services/diaryServices";
import {
  DiaryEntry,
  Visibility,
  Weather,
  parseVisibility,
  parseWeather,
} from "../../types";
import { AxiosError } from "axios";
import React from "react";

const WeatherRadioButtons = ({
  setWeather,
}: {
  setWeather: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      {Object.keys(Weather).map((k) => {
        return (
          <React.Fragment key={k.toString()}>
            {k.toString()}
            <input
              type="radio"
              value={k.toString()}
              name={"weather"}
              onChange={(e) => setWeather(e.target.value)}
            />
            {"   "}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const VisibilityButtons = ({
  setVisibility,
}: {
  setVisibility: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      {Object.keys(Visibility).map((k) => {
        return (
          <React.Fragment key={k.toString()}>
            {k.toString()}
            <input
              type="radio"
              value={k.toString()}
              aria-label={k.toString()}
              name={"visibility"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            {"    "}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const NewDiary = ({
  addDiaries,
  notifyErr,
}: {
  addDiaries: (newDiary: DiaryEntry) => void;
  notifyErr: (s: string) => void;
}) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("state", weather, visibility, date, comment);

    submitNewDiary({
      date,
      weather: parseWeather(weather),
      visibility: parseVisibility(visibility),
      comment,
    })
      .then((res) => {
        addDiaries(res);
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
      })
      .catch((err) => {
        if (err instanceof AxiosError && err.response && err.response.data) {
          notifyErr(err.response.data.error);
        } else {
          notifyErr("error occurred");
        }
      });
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="date">Date </label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <legend> Weather</legend>
        <WeatherRadioButtons setWeather={setWeather} />

        <label htmlFor="visibility"> Visibility</label>
        <VisibilityButtons setVisibility={setVisibility} />

        <label htmlFor="comment"> Comment </label>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit"> Record Diary </button>
      </form>
    </div>
  );
};

export default NewDiary;
