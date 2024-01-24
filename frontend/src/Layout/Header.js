import { Link } from "react-router-dom";
import { useAuth } from 'context/authContext.js';

const Header = ({ onToggleAside, showAside }) => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar bg-base-100 justify-center">
      {showAside && (
        <button onClick={onToggleAside} className="btn btn-square btn-ghost">
          <i className="fa-solid fa-bars"></i>
        </button>
      )}
      <div className="container">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">CartCraze</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li><Link className="btn btn-ghost normal-case text-xl" to="/home">Home</Link></li>
            <li><Link className="btn btn-ghost normal-case text-xl" to="/cart">Cart</Link></li>
            <li><Link className="btn btn-ghost normal-case text-xl" to="/category">Catalog</Link></li>
            {!user && <li><Link className="btn btn-ghost normal-case text-xl" to="/auth">Auth</Link></li>}
            {user && <li><button className="btn btn-ghost normal-case text-xl" onClick={() => logout()}>{user.username}</button></li>}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
