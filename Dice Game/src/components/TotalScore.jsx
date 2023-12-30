import styled from "styled-components";

function TotalScore({ totalScore }) {
  return (
    <>
      <ScoreSection>
        <h1>{totalScore}</h1>
        <p>Total Score</p>
      </ScoreSection>
    </>
  );
}

export default TotalScore;

const ScoreSection = styled.div`
  max-width: 200px;
  text-align: center;
  h1 {
    font-size: 100px;
    line-height: 100px;
  }
  p {
    font-size: 24px;
    font-weight: 500px;
  }
`;
