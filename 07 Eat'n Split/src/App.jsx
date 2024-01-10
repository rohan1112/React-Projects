import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SplitForm from "./components/SplitForm";
import User from "./components/User";
import Button from "./components/Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    img: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    img: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    img: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [userInfo, setUserInfo] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);

  const handleShowAddUser = () => {
    setShowAddUser((prev) => !prev);
  };

  const addUsers = (newUser) => {
    setUserInfo((userInfo) => [...userInfo, newUser]);
    setShowAddUser(false);
  };

  const onSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
  };

  const onSplitBill = (value) => {
    setUserInfo((user) =>
      user.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  };

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Sidebar
            onSelection={onSelection}
            selectedFriend={selectedFriend}
            userInfo={userInfo}
          ></Sidebar>
          {showAddUser && <User addUsers={addUsers}></User>}
          <Button onClick={handleShowAddUser}>
            {showAddUser ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectedFriend && (
          <SplitForm
            onSplitBill={onSplitBill}
            selectedFriend={selectedFriend}
            key={selectedFriend.id}
          ></SplitForm>
        )}
      </div>
    </>
  );
}

export default App;
