import { useQuestion } from "../context/QuizContext";

function Finish() {
  const { points, totalPoints, dispatch, highscore } = useQuestion();
  return (
    <>
      <div className="result">
        <p>
          You Scored <strong>{points}</strong> points out of {totalPoints}{" "}
          points
        </p>
      </div>
      <div className="highscore">
        (Highscore: <strong>{highscore}</strong> Points)
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finish;
