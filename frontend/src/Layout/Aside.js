const Aside = ({ isOpen, onClose }) => {
  return (
    <aside className={`aside menu p-2 overflow-y-auto w-80 bg-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={onClose} className="btn btn-square btn-ghost">
        <i className="fas fa-times"></i>
      </button>
      <ul>
        <li><a>Dashboard</a></li>
        <li><a>Products</a></li>
        <li><a>Orders</a></li>
        <li><a>Settings</a></li>
      </ul>
    </aside>
  );
};

export default Aside;
