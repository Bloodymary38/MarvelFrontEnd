import Logo from "../assets/Logo.png";
import Logo2 from "../assets/react.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div>
        <img src={Logo2} alt="Logo Marvel" />
      </div>
      <div className="right-header">
        <div>
          <Link to="/Persos">Caracteres</Link>
        </div>
        <div>
          <Link to="/Comics">Comics</Link>
        </div>
        <div style={{ color: "blue" }}>toto</div>
      </div>
    </header>
  );
};

export default Header;
