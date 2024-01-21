import { Link } from "react-router-dom";

const Aside = ({ isOpen, onClose }) => {
  return (
    <aside className={`aside menu p-2 overflow-y-auto w-80 bg-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={onClose} className="btn btn-square btn-ghost">
        <i className="fas fa-times"></i>
      </button>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/">Orders</Link></li>
        <li><Link to="/">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Aside;
