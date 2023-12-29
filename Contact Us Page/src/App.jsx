import "./App.css";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <main className="main_container">
        <Contact></Contact>
      </main>
    </>
  );
}

export default App;
