import React, { useState } from "react";
import Button from "./Button";

function User({ addUsers }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");

  const handleUserInfo = (e) => {
    e.preventDefault();

    if (!name || !img) return;

    const id = crypto.randomUUID();
    const newUser = { id, name, img: `${img}?=${id}`, balance: 0 };

    addUsers(newUser);
    setName("");
    setImg("https://i.pravatar.cc/48");
  };
  return (
    <form action="" onSubmit={handleUserInfo} className="form-add-friend">
      <label htmlFor="">🧑‍🤝‍🧑Name</label>
      <input
        type="text"
        name=""
        id=""
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">😎 Img</label>
      <input
        type="text"
        name=""
        id=""
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <Button>Submit</Button>
    </form>
  );
}

export default User;
