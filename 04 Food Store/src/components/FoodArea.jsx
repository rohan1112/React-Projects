import React from "react";
import styled from "styled-components";
import { Maincontainer, URL } from "../App";
import Button from "./Button";

function FoodArea({ data, notFound }) {
  return (
    <FoodSection>
      <Maincontainer>
        {notFound ? (
          <FoodCards>
            <FoodCard isFound={true}>
              <h3>Item Not Found</h3>
            </FoodCard>
          </FoodCards>
        ) : (
          <FoodCards>
            {data?.map(({ name, image, text, price }) => (
              <FoodCard key={name}>
                <div className="food_img">
                  <img src={URL + image} alt="logo" />
                </div>
                <div className="foodInfo">
                  <div className="info">
                    <h3>{name}</h3>
                    <p>{text}</p>
                  </div>
                  <Button text={"$" + price.toFixed(2)}></Button>
                </div>
              </FoodCard>
            ))}
          </FoodCards>
        )}
      </Maincontainer>
    </FoodSection>
  );
}
export default FoodArea;

const FoodSection = styled.div`
  height: calc(100vh - 211px);
  background-image: url("./images/bg1.jpg");
  /* background-repeat: no-repeat; */
  background-size: cover;
  background-position: center center;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  row-gap: 32px;
  column-gap: 20px;
  padding-top: 80px;
`;

const FoodCard = styled.div`
  width: 370px;
  height: 167px;
  border-radius: 20px;
  border: 0.659px solid #98f9ff;
  background: url(.png),
    lightgray 0% 0% / 50.8334219455719px 50.8334219455719px repeat,
    radial-gradient(
      151.92% 127.02% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.04) 77.08%,
      rgba(70, 144, 212, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.184196472167969px);

  display: flex;
  padding: 8px;

  justify-content: ${(props) => (props.isFound ? "center" : "none")};
  align-items: ${(props) => (props.isFound ? "center" : "none")};

  .foodInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
  }
  h3 {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 500;
  }
  p {
    font-size: 12px;
    margin-top: 4px;
  }
`;
