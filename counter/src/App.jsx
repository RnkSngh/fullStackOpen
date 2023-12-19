import Display from "./compontents/Display";
import Button from "./compontents/Button";

function App() {
  return (
      <div>
        <div>
          <Display />
          <Button type="INC" label="+" />
          <Button type="DEC" label="-" />
          <Button type="ZERO" label="0" />
        </div>
      </div>
  );
}

export default App;
