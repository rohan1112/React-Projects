import React from "react";
import "./pizzaCard.css";

function PizzaCard({ pizzaData }) {
  return (
    <>
      <div className="pizCards">
        {pizzaData?.map(
          ({ name, ingredients, price, photoName, soldOut }, index) => (
            <div className={soldOut ? "pizcard-sold-out" : "pizcard"}>
              <div className="pizImg">
                <img
                  src={photoName}
                  className={soldOut ? "sold-out" : ""}
                  alt=""
                />
              </div>
              <div className="info">
                <h3>{name}</h3>
                <p>{ingredients}</p>
                {soldOut ? <p>SOLD OUT</p> : <p>{price}</p>}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default PizzaCard;
