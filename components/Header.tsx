import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 py-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400">
        Member Punjab Bar Council
      </h1>
      <p className="mt-2 text-lg sm:text-xl text-slate-600 dark:text-slate-400">
        Bahawalpur Division - Election Dashboard
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
        Dashboard by{' '}
        <a
          href="https://alianwaarwarind.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Ali Anwaar
        </a>
      </p>
      <p className="mt-4 max-w-3xl mx-auto text-base text-slate-500 dark:text-slate-400">
        An analytical view of the competition for the 6 total seats across the Bahawalpur Division. Results are visualized based on a hybrid allocation system, with reserved seats for each of the three districts.
      </p>
    </header>
  );
};

export default Header;