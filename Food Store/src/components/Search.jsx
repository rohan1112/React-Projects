import styled from "styled-components";

function Search({ searchFood }) {
  return (
    <>
      <SearchContainer>
        <input type="text" placeholder="search food..." onChange={searchFood} />
      </SearchContainer>
    </>
  );
}

export default Search;

const SearchContainer = styled.div`
  input {
    height: 40px;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    padding: 0 1px;
    &::placeholder {
      color: white;
    }
  }
`;
