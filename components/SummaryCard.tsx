import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-xl shadow-md p-6 flex items-center justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-lg border border-transparent hover:border-blue-300 dark:hover:border-blue-700">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
      </div>
      <div className="bg-slate-100 dark:bg-slate-700 rounded-full p-3">
        {icon}
      </div>
    </div>
  );
};

export default SummaryCard;
