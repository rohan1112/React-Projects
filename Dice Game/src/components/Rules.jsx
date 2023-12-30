import styled from "styled-components";

function Rules() {
  return (
    <>
      <RuleContainer>
        <h1>How to play this Game</h1>
        <div className="txt">
          <p>Select any number</p>
          <p>Click on Dice Image</p>
          <p>
            If selected number is equal to the roll dice you will get same point
            as roll dice
          </p>
          <p>If the guess wrong then 2 point will be deducted</p>
        </div>
      </RuleContainer>
    </>
  );
}

export default Rules;

const RuleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #fbf1f1;
  padding: 20px;
  margin-top: 40px;
  border-radius: 10px;
  h2 {
    font-size: 24px;
  }
  .txt {
    margin-top: 24px;
  }
`;
