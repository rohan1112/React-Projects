import React from "react";
import "./pizza.css";
import PizzaCard from "./PizzaCard";
import { pizzaData } from "../data";

function Pizza() {
  return (
    <>
      <main className="container">
        <h1>-WelCome to PizzaRia-</h1>
        <h2>Menu</h2>
        <p className="menuInfo">
          Authentic Italian cuisine. 6 creative dishes to choose from. All from
          our stone oven, all organic, all delicious.
        </p>
        <PizzaCard pizzaData={pizzaData}></PizzaCard>
        <p>We're open from 12:00 to 22:00. Come visit us or order online.</p>
        <button className="btn">Order</button>
      </main>
    </>
  );
}

export default Pizza;
