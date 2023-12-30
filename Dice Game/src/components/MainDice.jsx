import styled from "styled-components";
function MainDice({ currentDice, rollDice, resetScore, isSpinning }) {
  return (
    <>
      <DiceContainer>
        <div>
          <img
            className={isSpinning ? "dice spin" : "dice"}
            src={`./dice/dice_${currentDice}.png`}
            alt="dice_1"
            onClick={rollDice}
          />
        </div>
        <p>Click on Dice to Roll</p>
      </DiceContainer>
    </>
  );
}

export default MainDice;

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;

  .diceImg {
    transition: transform 0.5s ease-in-out; /* Add smooth transition */
  }

  .dice.spin {
    animation: spin 1s ease-in-out;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
