
import { useEffect, useState } from "react";
// import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [randomNumber, setRandomNumber] = useState(randomNumberGenerator());
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  let recognition = new window.SpeechRecognition();

  recognition.start();
  useEffect(() => {
    if (Number(text) === randomNumber) {
      setResult(
        `Congratulations`
      );
      setScore(score + 1);
      setRandomNumber(randomNumberGenerator());
    }
    return () => setResult("");
  }, [text]);

  // useEffect(() => {
  recognition.addEventListener("result", (e) => {
    console.log({ event: e });
    setText(e.results[0][0].transcript);
  });

  function randomNumberGenerator() {
    return Math.floor(Math.random() * 100);
  }

  return (
    <div className="App">
      {/* <h1>Text</h1> */}
      <h4>Score: {score}</h4>
      {result ? (
        <div>{result}</div>
      ) : (
        <div>
          <p>{text}</p>
          <div>Number: {randomNumber}</div>
        </div>
      )}
      <button
        onClick={() => {
          setRandomNumber(randomNumberGenerator());
          setResult("");
        }}
      >
        Change Number
      </button>
    </div>
  );
}
