import styled from "styled-components";
import Button from "./Button";
import Search from "./Search";

function Navbar({ searchFood, selectCategory }) {
  const btnName = ["All", "Breakfast", "Lunch", "Dinner"];
  return (
    <>
      <Container>
        <Nav>
          <div className="img">
            <img src="./images/restaurant.png" alt="logo" />
          </div>

          <div className="search">
            <Search searchFood={searchFood}></Search>
          </div>
        </Nav>
        <MenuContainer>
          <div className="menu">
            {btnName.map((value, index) => (
              <Button
                key={index}
                text={value}
                selectCategory={selectCategory}
              ></Button>
            ))}
            {/* <Button text="All" selectCategory={selectCategory}></Button>
            <Button text="Breakfast" selectCategory={selectCategory}></Button>
            <Button text="Lunch" selectCategory={selectCategory}></Button>
            <Button text="Dinner" selectCategory={selectCategory}></Button> */}
          </div>
        </MenuContainer>
      </Container>
    </>
  );
}

export default Navbar;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  min-height: 140px;
  align-items: center;
  .img img {
    height: 50px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  .menu {
    display: flex;
    gap: 12px;
  }
`;
