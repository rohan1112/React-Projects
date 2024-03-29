import { useEffect } from "react";
import { useQuestion } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuestion();

  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => {
        clearInterval(id);
      };
    },

    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
