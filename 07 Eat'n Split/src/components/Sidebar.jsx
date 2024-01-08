import React, { useState } from "react";
import User from "./User";
import Button from "./Button";

function Sidebar({ onSelection, userInfo, selectedFriend }) {
  return (
    <>
      <ul>
        {userInfo.map((user, index) => (
          <Info
            user={user}
            onSelection={onSelection}
            key={user.id}
            selectedFriend={selectedFriend}
          ></Info>
        ))}
      </ul>
    </>
  );
}

function Info({ user, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === user.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={user.img} alt={user.name} />
      <h3>{user.name}</h3>
      {user.balance < 0 && (
        <p className="red">
          You owe {user.name} ${Math.abs(user.balance)}
        </p>
      )}
      {user.balance > 0 && (
        <p className="green">
          {user.name} owe you ${Math.abs(user.balance)}
        </p>
      )}
      {user.balance === 0 && <p>You and {user.name} are even</p>}
      <Button onClick={() => onSelection(user)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Sidebar;
