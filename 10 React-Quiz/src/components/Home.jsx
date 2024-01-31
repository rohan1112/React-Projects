import { useQuestion } from "../context/QuizContext";

function Home() {
  const { dispatch } = useQuestion();
  return (
    <div className="start">
      <h2>Welcome To The React Quiz !</h2>
      <h3>15 questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
    </div>
  );
}

export default Home;
