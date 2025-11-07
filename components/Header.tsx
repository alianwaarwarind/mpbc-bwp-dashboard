import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 py-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400">
        Member Punjab Bar Council
      </h1>
      <p className="mt-2 text-lg sm:text-xl text-slate-600 dark:text-slate-400">
        Bahawalpur Seat - Election Dashboard
      </p>
    </header>
  );
};

export default Header;