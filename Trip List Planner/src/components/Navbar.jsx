import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <Nav>
      <h1>🏝️ Far Away 🧳</h1>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.div`
  width: 100%;
  h1 {
    background-color: #f4a226;
    font-family: "Monoton";
    font-size: 8rem;
    font-weight: 400;
    letter-spacing: -5px;
    padding: 2.4rem 0;
    text-align: center;
    text-transform: uppercase;
    word-spacing: 30px;
  }
`;
