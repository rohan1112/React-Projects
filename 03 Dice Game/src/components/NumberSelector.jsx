import styled from "styled-components";

function NumberSelector({ selectedNum, setSelectedNum, error, setError }) {
  const arrNumber = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <BoxContainer>
        <p className="error">{error}</p>
        <div className="flex">
          {arrNumber.map((value, index) => (
            <Box
              isSelected={value === selectedNum}
              key={index}
              onClick={() => {
                setSelectedNum(value);
                setError("");
              }}
            >
              {value}
            </Box>
          ))}
        </div>
        <p>Select Number</p>
      </BoxContainer>
    </>
  );
}
export default NumberSelector;

const Box = styled.div`
  height: 72px;
  width: 72px;
  border: 1px solid black;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => (props.isSelected ? "black" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  .flex {
    display: flex;
    gap: 30px;
  }
  p {
    font-size: 24px;
    font-weight: 700;
  }
  .error {
    color: red;
  }
`;
