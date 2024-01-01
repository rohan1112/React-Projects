import styled from "styled-components";
import "./App.css";
import Navbar from "./components/Navbar";
import FoodArea from "./components/FoodArea";
import { useEffect, useState } from "react";

export const URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const FoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(URL);

        const jsonFood = await response.json();

        setData(jsonFood);
        setFilterData(jsonFood);
        setLoading(false);
      } catch (error) {
        setError("unable to fetch data");
      }
    };
    FoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == "") {
      setFilterData(null);
      setNotFound(false);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (filter.length === 0) {
      setNotFound(true);
    }
    setFilterData(filter);
  };

  const selectCategory = (type) => {
    if (type.toLowerCase() === "all") {
      setFilterData(data);
      selectCategory("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );

    setFilterData(filter);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      <Maincontainer>
        <Navbar
          searchFood={searchFood}
          selectCategory={selectCategory}
        ></Navbar>
      </Maincontainer>
      <FoodArea data={filterData} notFound={notFound}></FoodArea>
    </>
  );
}

export default App;

export const Maincontainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
