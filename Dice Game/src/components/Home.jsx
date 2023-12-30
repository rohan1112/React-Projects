import styled from "styled-components";
import Button from "./Button";
import "./home.css";

function Home({ toggle }) {
  return (
    <Container>
      <div>
        <img src="./dice/dices.png" alt="" />
      </div>
      <div className="gametext">
        <h1>Dice Game</h1>
        <Button text="PLAY NOW" className={"primary-btn"} onClick={toggle} />
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  max-width: 1180px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  align-items: center;
  .gametext {
    h1 {
      font-size: 96px;
      white-space: nowrap;
    }
  }
`;
