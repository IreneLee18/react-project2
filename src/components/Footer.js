import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <span>我是footer</span>
          <Link to="/" className="a-link">回首頁</Link>
        </div>
      </footer>
    </>
  );
}
export default Footer;
