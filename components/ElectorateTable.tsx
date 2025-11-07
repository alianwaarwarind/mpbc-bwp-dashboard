
import React from 'react';
import { Tehsil } from '../types';

interface ElectorateTableProps {
  tehsils: Tehsil[];
}

const ElectorateTable: React.FC<ElectorateTableProps> = ({ tehsils }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-6 py-3">District</th>
              <th scope="col" className="px-6 py-3">Tehsil Name</th>
              <th scope="col" className="px-6 py-3 text-right">Lower Court Voters</th>
              <th scope="col" className="px-6 py-3 text-right">High Court Voters</th>
              <th scope="col" className="px-6 py-3 text-right">Total Electorate</th>
            </tr>
          </thead>
          <tbody>
            {tehsils.map((tehsil, index) => (
              <tr key={index} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/30">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  {tehsil.district}
                </td>
                <td className="px-6 py-4">{tehsil.name}</td>
                <td className="px-6 py-4 text-right font-mono">{tehsil.lowerCourtVoters.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono">{tehsil.highCourtVoters.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono font-bold text-slate-700 dark:text-slate-300">{tehsil.totalElectorate.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
           <tfoot className="font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700">
                <tr>
                    <td colSpan={2} className="px-6 py-3 text-base">Division Totals</td>
                    <td className="px-6 py-3 text-right font-mono">{tehsils.reduce((sum, t) => sum + t.lowerCourtVoters, 0).toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-mono">{tehsils.reduce((sum, t) => sum + t.highCourtVoters, 0).toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-mono">{tehsils.reduce((sum, t) => sum + t.totalElectorate, 0).toLocaleString()}</td>
                </tr>
            </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ElectorateTable;
