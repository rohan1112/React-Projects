import React, { useState } from "react";
import styled from "styled-components";

function PackingList({ items, handleCheck, handleDelete, handleClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <PackList>
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear List</button>
      </div>
    </PackList>
  );
}

function Item({ item, handleCheck, handleDelete }) {
  return (
    <li className="list">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleCheck(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}
export default PackingList;

const PackList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  background-color: aquamarine;
  align-items: center;
  justify-content: center;

  input[type="checkbox"] {
    height: 2rem;
    width: 2rem;
    accent-color: #e5771f;
  }

  ul {
    list-style: none;
    width: 80%;
    overflow: scroll;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
    justify-content: center;
    align-content: start;
  }

  .list button {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1.8rem;
    padding: 0.8rem;
    transform: translateY(2px);
  }

  .actions {
    display: flex;
    margin-top: 40px;
    gap: 10px;
  }
`;
