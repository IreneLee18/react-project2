import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header>
        <nav className="container">
          <Link to="/" className="a-link">Home</Link>
          <ul>
            <li>
              <Link to="faq" className="a-link">FAQ</Link>
            </li>
            <li>
              <Link to="tour" className="a-link">Tour</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Header;
