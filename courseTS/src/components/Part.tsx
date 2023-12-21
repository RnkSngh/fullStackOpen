import { CoursePart } from "../../types";

const assertNever = (item: never): never => {
  throw new Error("exception occurred");
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h1>{part.name}</h1>
          <p>
            {part.description}
            exercise Count: {part.exerciseCount}
          </p>
        </div>
      );

    case "background":
      return (
        <div>
          <h1> {part.name}</h1>
          <p>
            {part.description}
            Background material {part.backgroundMaterial}
            exerciseCount {part.exerciseCount}
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <h1> {part.name}</h1>
          <p>
            Group project count: {part.groupProjectCount}
            exerciseCount {part.exerciseCount}
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h1>{part.name}</h1>
          <p>
            {part.description}
            exercise Count: {part.exerciseCount}
          </p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      assertNever(part);
  }
};

export default Part;
