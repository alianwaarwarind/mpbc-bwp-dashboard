import React from 'react';
import { CandidateWithVotes, Tehsil } from '../types.ts';
import { DISTRICTS } from '../constants.tsx';

interface DivisionLeaderboardProps {
  candidates: CandidateWithVotes[];
  tehsils: Tehsil[];
  selectedTehsil: string;
  onTehsilChange: (tehsilName: string) => void;
  onCandidateSelect: (candidate: CandidateWithVotes) => void;
}

const getDistrictColor = (districtName: string): string => {
    return DISTRICTS.find(d => d.name === districtName)?.color || 'text-slate-500';
}

const DivisionLeaderboard: React.FC<DivisionLeaderboardProps> = ({ candidates, tehsils, selectedTehsil, onTehsilChange, onCandidateSelect }) => {

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <h4 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-2 sm:mb-0">
            Filter results by tehsil:
          </h4>
          <select
            aria-label="Filter results by tehsil"
            value={selectedTehsil}
            onChange={(e) => onTehsilChange(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition"
          >
            <option value="All Tehsils">All Tehsils (Overall)</option>
            {tehsils.map((tehsil) => (
              <option key={tehsil.name} value={tehsil.name}>
                {tehsil.name}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
              <tr>
                <th scope="col" className="px-4 py-3 text-center w-16">Rank</th>
                <th scope="col" className="px-4 py-3">Candidate</th>
                <th scope="col" className="px-4 py-3">District</th>
                <th scope="col" className="px-4 py-3 text-right">Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => {
                return (
                    <tr
                      key={`${candidate.serial}-${candidate.district}`}
                      className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/30 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white text-center">
                        {selectedTehsil === 'All Tehsils' ? index + 1 : '-'}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                         <button 
                            onClick={() => onCandidateSelect(candidate)}
                            className="text-left hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          >
                            {candidate.name}
                          </button>
                      </td>
                      <td className={`px-4 py-3 font-medium ${getDistrictColor(candidate.district)}`}>
                        {candidate.district}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold">
                        {candidate.votes.toLocaleString()}
                      </td>
                    </tr>
                );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DivisionLeaderboard;