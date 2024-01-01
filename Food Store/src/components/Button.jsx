import { useEffect } from "react";
import styled from "styled-components";

function Button({ text, selectCategory }) {
  return (
    <>
      <Btn onClick={() => selectCategory(text)}>{text}</Btn>
    </>
  );
}

export default Button;

const Btn = styled.button`
  padding: 6px 12px;
  min-width: 100px;
  background-color: orange;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: white;
    /* border: solid black; */
    color: black;
    transition: 0.3s background ease-in;
  }
`;
