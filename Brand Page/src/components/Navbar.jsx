import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div>
        <nav className="container">
          <div className="logo">
            <img src="./images/brand_logo.png"></img>
          </div>
          <ul>
            <li>Menu</li>
            <li>Location</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <button>Login</button>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
