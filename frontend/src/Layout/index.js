import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './Header';
import Aside from './Aside';
import './layout.scss';

const Layout = ({ disableHeader, disableAside }) => {
  const [isAsideOpen, setAsideOpen] = useState(false);

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  return (
    <>
      {!disableHeader && (
        <Header onToggleAside={toggleAside} showAside={!disableAside} />
      )}
      {!disableAside && (
        <Aside isOpen={isAsideOpen} onClose={() => setAsideOpen(false)} />
      )}
      <main className='bg-gray-100'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;