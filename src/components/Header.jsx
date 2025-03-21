import Logo from "../assets/Logo.png";
import Logo2 from "../assets/react.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="left-header">
        <img src={Logo} alt="Logo Marvel" />
      </div>
      <div className="right-header">
        <div>
          <Link className="custom-link" to="/Persos">
            Characters
          </Link>
        </div>
        <div>
          <Link className="custom-link" to="/Comics">
            Comics
          </Link>
        </div>
        <div className="custom-link">Favorites</div>
      </div>
    </header>
  );
};

export default Header;
