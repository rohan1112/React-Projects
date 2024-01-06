import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AddItem from "./components/AddItem";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

function App() {
  const [items, setItem] = useState([]);

  const addItem = (newitem) => {
    setItem((items) => [...items, newitem]);
  };

  const handleCheck = (id) => {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItem((items) => items.filter((item) => item.id !== id));
  };

  const handleClearList = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItem([]);
  };

  return (
    <>
      <main className="app">
        <Navbar></Navbar>
        <AddItem addItem={addItem}></AddItem>
        <PackingList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleClearList={handleClearList}
        ></PackingList>
        <Stats items={items}></Stats>
      </main>
    </>
  );
}

export default App;
