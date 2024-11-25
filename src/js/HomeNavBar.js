import { Link } from "react-router-dom";

const HomeNavBar = () => {
  return (
    <nav className="app-bar">
      <div className="logo-container">
        <img
            src="/api/placeholder/40/40"
            alt="logo"
            className="logo-image"
          />
      </div>      
    </nav>
  );
};

export default HomeNavBar;