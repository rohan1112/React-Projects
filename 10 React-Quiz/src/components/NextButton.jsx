import { useQuestion } from "../context/QuizContext";

function NextButton() {
  const { dispatch, answer, totalQue, index } = useQuestion();
  if (answer === null) return null;
  if (index < totalQue - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "next" })}
        >
          Next
        </button>
      </div>
    );

  if (index === totalQue - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
}

export default NextButton;
