function Quiz({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <Option
            key={index}
            option={option}
            index={index}
            dispatch={dispatch}
            answer={answer}
            question={question}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ question, option, index, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <>
      <button
        className={`btn btn-option ${answer === index ? "answer" : ""} ${
          hasAnswered
            ? index === question.correctOption
              ? "correct"
              : "wrong"
            : ""
        }`}
        disabled={hasAnswered}
        onClick={() => dispatch({ type: "newAnswer", payload: index })}
      >
        {option}
      </button>
    </>
  );
}

export default Quiz;
