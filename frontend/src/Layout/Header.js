import { Link } from "react-router-dom";

const Header = ({ onToggleAside, showAside }) => {
  return (
    <header className="navbar bg-base-100">
      {showAside && (
        <button onClick={onToggleAside} className="btn btn-square btn-ghost">
          <i class="fa-solid fa-bars"></i>
        </button>
      )}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">CartCraze</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/">Blogs</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
