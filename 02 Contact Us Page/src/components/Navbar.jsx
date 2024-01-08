import "./navbar.css";

function Navbar() {
  return (
    <nav className="nav-container">
      <img src="./images/brand_logo.png" alt="" />
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
