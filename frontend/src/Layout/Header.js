const Header = ({ onToggleAside, showAside }) => {
  return (
    <header className="navbar bg-base-100">
      {showAside && (
        <button onClick={onToggleAside} className="btn btn-square btn-ghost">
          <i class="fa-solid fa-bars"></i>
        </button>
      )}
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">CartCraze</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><a>Home</a></li>
          <li><a>Blogs</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
