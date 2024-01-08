import "./contact.css";
import { MdMessage } from "react-icons/md";
import { MdCall } from "react-icons/md";
import Button from "./button";
import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const onSubmit = (event) => {
    const formData = {
      Name: name,
      Email: email,
      Message: text,
    };
    alert(`Form submitted with data: 
    ${JSON.stringify(formData)}`);
    location.reload();
  };

  return (
    <>
      <div className="nav-container contact_section">
        <h1>Contact Us</h1>
        <p>
          LET’S CONNECT: WE’RE HERE TO HELP, AND WE’D LOVE TO HEAR FROM YOU!
          WHETHER YOU HAVE A QUESTION, COMMENT, OR JUST WANT TO CHAT , YOU CAN
          REACH OUT TO US THROUGH THE CONTACT FORM OF THIS PAGE, OR BY PHONE,
          EMAIL, OR SOCIAL MEDIA.{" "}
        </p>
      </div>
      <section className="container">
        <div className="form-container">
          <div className="top-btn">
            <Button
              text="VIA SUPPORT CHAT"
              icon={<MdMessage fontSize="24px" />}
              className="primary-btn"
            ></Button>
            <Button
              text="VIA CALL"
              icon={<MdCall fontSize="24px" />}
              className="primary-btn"
            ></Button>
          </div>
          <Button
            text="VIA EMAIL"
            icon={<MdMessage fontSize="24px" />}
            className="secondary-btn"
          ></Button>
          <form onSubmit={onSubmit}>
            <div className="form-cntrl">
              <label htmlFor="name">Name</label>
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-cntrl">
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-cntrl">
              <label htmlFor="text">Text</label>
              <textarea
                type="text"
                rows={7}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="submit-btn">
              <Button className="primary-btn" text="SUBMIT"></Button>
            </div>
          </form>
        </div>

        <div className="img-container">
          <img src="./images/Service 24_7-pana 1.svg" alt="" />
        </div>
      </section>
    </>
  );
}

export default Contact;
