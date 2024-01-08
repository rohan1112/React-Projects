import { useState } from "react";
import Button from "./Button";
import MainDice from "./MainDice";
import NumberSelector from "./NumberSelector";
import TotalScore from "./TotalScore";
import styled from "styled-components";
import Rules from "./Rules";

function GamePlay() {
  const [selectedNum, setSelectedNum] = useState(0);
  const [currentDice, setCurrentDice] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const randomNumberGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const rollDice = () => {
    if (!selectedNum) {
      setError("You have not selected any number");
      return;
    }
    setError("");

    handleClick();
  };

  const resetScore = () => {
    setTotalScore(0);
  };

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      const randomNumber = randomNumberGenerator(1, 7);

      setCurrentDice((prev) => randomNumber);

      if (selectedNum === randomNumber) {
        setTotalScore((prev) => prev + randomNumber);
      } else {
        setTotalScore((prev) => {
          if (prev >= 2) {
            return prev - 2;
          } else if (prev === 1) {
            return 0;
          } else {
            return prev;
          }
        });
      }
      setSelectedNum(undefined);
    }, 1000); // Adjust the time to match the duration of the animation
  };

  return (
    <>
      <Maincontainer>
        <Score>
          <TotalScore totalScore={totalScore} />
          <NumberSelector
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            error={error}
            setError={setError}
          />
        </Score>
        <MainDice
          currentDice={currentDice}
          rollDice={rollDice}
          resetScore={resetScore}
          setIsSpinning={setIsSpinning}
          isSpinning={isSpinning}
        />
        <Btn>
          <Button text="RESET SCORE" onClick={resetScore} isOn={true}></Button>
          <Button
            text={showRules ? "Hide Rules" : "Show Rules"}
            onClick={() => setShowRules((prev) => !prev)}
          ></Button>
        </Btn>
        {showRules && <Rules />}
      </Maincontainer>
    </>
  );
}

export default GamePlay;
const Maincontainer = styled.main`
  padding-top: 70px;
`;
const Score = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  gap: 10px;
`;

const Btn = styled.div`
  margin-top: 40px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
