import React, { useState } from "react";
import Button from "./Button";

function SplitForm({ onSplitBill, selectedFriend, userInfo }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState();
  const [billPayer, setBillPayer] = useState("You");
  let friendExpense = bill ? bill - myExpense : "";

  const handleSplitBill = (e) => {
    e.preventDefault();

    if (!bill || !myExpense) return;
    onSplitBill(billPayer === "You" ? friendExpense : -myExpense);
  };

  return (
    <>
      <form
        action=""
        className="form-split-bill"
        onSubmit={(e) => handleSplitBill(e)}
      >
        <h2>Split a Bill with {selectedFriend.name}</h2>
        <label htmlFor="">💰Bill Value</label>
        <input type="text" onChange={(e) => setBill(+e.target.value)} />
        <label htmlFor="">🕴️ Your Expense</label>
        <input
          type="text"
          value={myExpense}
          onChange={(e) =>
            setMyExpense(+e.target.value > bill ? myExpense : +e.target.value)
          }
        />
        <label>🧑‍🤝‍🧑 {selectedFriend.name} Expense</label>
        <input type="text" value={friendExpense} disabled />
        <label>🤑 Who is paying for the bill</label>
        <select
          value={billPayer}
          onChange={(e) => setBillPayer(e.target.value)}
        >
          <option value="You">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Spilt Bill</Button>
      </form>
    </>
  );
}

export default SplitForm;
