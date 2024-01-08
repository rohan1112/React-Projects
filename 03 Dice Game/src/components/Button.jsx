import styled from "styled-components";

function Button({ text, isOn, className, ...rest }) {
  return (
    <Buttons {...rest} className={className} isOn={isOn}>
      {text}
    </Buttons>
  );
}

export default Button;

const Buttons = styled.button`
  padding: 18px 10px;
  min-width: 220px;
  background-color: ${(props) => (props.isOn ? "white" : "black")};
  color: ${(props) => (props.isOn ? "black" : "white")};
  align-items: center;
  font-size: 16px;
  border-radius: 5px;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
    transition: 0.3s background ease-in;
  }
`;
