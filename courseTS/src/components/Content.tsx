import { CoursePart } from "../../types";
import Part from "./Part";

type ContentProps = {
  courses: CoursePart[];
};

const Content = (props: ContentProps) => {
  const { courses } = props;
  return (
    <>
      {courses.map((course) => {
        return <Part key={course.name} part={course} />;
      })}
    </>
  );
};

export default Content;
