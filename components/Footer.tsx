import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 mt-8 border-t border-slate-200 dark:border-slate-700">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Made with ❤️ by{' '}
        <a
          href="https://alianwaarwarind.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Ali Anwaar
        </a>
      </p>
      <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
        <h4 className="font-semibold uppercase tracking-wider mb-2">Special Acknowledgements</h4>
        <p>Adv. Ali Pervaiz (Fort Abbas) & Mr. Hamza Saleem Jatoi (Liaqatpur)</p>
        <p>for their assistance in data collection.</p>
      </div>
    </footer>
  );
};

export default Footer;