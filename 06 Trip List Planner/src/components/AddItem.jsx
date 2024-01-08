import React, { useState } from "react";
import styled from "styled-components";

function AddItem({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const numbers = Array.from({ length: 20 }, (_, prev) => prev + 1);

  const submitHandler = (e) => {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    addItem(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <ItemAdder>
      <form onSubmit={submitHandler}>
        <h1>What do you need for your Trip ?</h1>
        <select onChange={(e) => setQuantity(Number(e.target.value))}>
          {numbers.map((num, index) => (
            <option key={index} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          placeholder="Item Name..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="special-button">Add</button>
      </form>
    </ItemAdder>
  );
}

export default AddItem;

const ItemAdder = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  background-color: #e5771f;
  height: 100px;

  form {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  h1 {
    font-size: 2.4rem;
    width: 100%;
  }

  .special-button {
    background-color: #76c7ad;
  }
`;
