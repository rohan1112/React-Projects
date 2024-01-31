import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Timer from "./components/Timer";
import { useQuestion } from "./context/QuizContext";

function App() {
  const { status } = useQuestion();

  return (
    <>
      <div className="app">
        <Header></Header>

        <Main>
          {status === "loading" && <Loader></Loader>}
          {status === "error" && <Error></Error>}
          {status === "ready" && <Home></Home>}
          {status === "active" && (
            <>
              <Progress></Progress>

              <Quiz />
              <Timer></Timer>
              <NextButton></NextButton>
            </>
          )}
          {status === "finished" && <Finish></Finish>}
        </Main>
      </div>
    </>
  );
}

export default App;
