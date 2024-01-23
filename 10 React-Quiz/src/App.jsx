import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { useReducer } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const initialState = {
  questions: [],

  // "loading" "error" "ready" "finished" "active"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataNotReceived":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case "next":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points } = state;

  const totalQue = questions.length;

  const totalPoints = questions.reduce((acc, value) => {
    return acc + value.points;
  }, 0);

  const handleClick = () => {
    dispatch({ type: "start" });
  };

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataNotReceived", payload: err }));
  }, []);

  return (
    <>
      <div className="app">
        <Header></Header>

        <Main>
          {status === "loading" && <Loader></Loader>}
          {status === "error" && <Error></Error>}
          {status === "ready" && <Home handleClick={handleClick}></Home>}
          {status === "active" && (
            <>
              <Progress
                index={index}
                points={points}
                totalPoints={totalPoints}
                totalQue={totalQue}
                answer={answer}
              ></Progress>

              <Quiz
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton dispatch={dispatch} answer={answer}></NextButton>
            </>
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
