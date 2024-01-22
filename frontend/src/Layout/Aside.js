import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'api/axios.js';

const Aside = ({ isOpen, onClose }) => {
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    axios.get('/api/category/')
      .then(res => { setCatalog(res.data); console.log(res.data) })
  }, [])

  return (
    <aside className={`gap-4 aside menu py-4 px-2 overflow-y-auto w-80 bg-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={onClose} className="btn btn-square btn-ghost">
        <i className="fas fa-times"></i>
      </button>
      <ul>
        {catalog && catalog.map(el => (
          <li key={el._id} className="mb-2">
            <Link to={`/category/${el.name}`}>{el.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
