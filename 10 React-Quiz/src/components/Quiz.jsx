import { useQuestion } from "../context/QuizContext";

function Quiz() {
  const { questions, index } = useQuestion();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
      {/* <div className="options">
        {question.options.map((option, optionIndex) => (
          <Options
            key={optionIndex}
            option={option}
            optionIndex={optionIndex}
            question={question}
          />
        ))}
      </div> */}
    </div>
  );
}

function Options({ question }) {
  const { dispatch, answer } = useQuestion();
  const hasAnswered = answer !== null;
  return (
    <>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Quiz;
