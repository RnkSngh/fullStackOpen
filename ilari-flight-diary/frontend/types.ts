export enum Weather {
  sunny = "sunny",
  rainy = "rainy",
  cloudy = "cloudy",
  stormy = "stormy",
  windy = "windy",
}

export enum Visibility {
  great = "great",
  good = "good",
  ok = "ok",
  poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export const isWeather = (s: string): s is Weather => {
  return Object.keys(Weather).includes(s);
};

export const isVisibility = (s: string): s is Visibility => {
  return Object.keys(Visibility).includes(s);
};

export const parseWeather = (weather: string): Weather => {
  if (isWeather(weather)) {
    return weather;
  }
  throw new Error("Invalid weather" + weather);
};

export const parseVisibility = (visibility: string): Visibility => {
  if (isVisibility(visibility)) {
    return visibility;
  }
  throw new Error("Invalid visibility" + visibility);
};
