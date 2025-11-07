import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { CandidateWithVotes, District } from '../types.ts';
import { TrophyIcon } from '../constants.tsx';

interface DistrictResultsProps {
  district: District;
  candidates: CandidateWithVotes[];
  onCandidateSelect: (candidate: CandidateWithVotes) => void;
}

const DistrictResults: React.FC<DistrictResultsProps> = ({ district, candidates, onCandidateSelect }) => {
  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => b.votes - a.votes);
  }, [candidates]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className={`p-4 sm:p-6 border-b-4 ${district.color.replace('text-', 'border-')}`}>
        <h3 className={`text-xl sm:text-2xl font-bold ${district.color}`}>{district.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {district.reservedSeats} Reserved Seat{district.reservedSeats > 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-200">Candidate Standings</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                <tr>
                  <th scope="col" className="px-4 py-3">Rank</th>
                  <th scope="col" className="px-4 py-3">Candidate</th>
                  <th scope="col" className="px-4 py-3 text-right">Votes</th>
                </tr>
              </thead>
              <tbody>
                {sortedCandidates.map((candidate, index) => {
                  const isWinner = index < district.reservedSeats;
                  return (
                    <tr
                      key={candidate.serial}
                      className={`border-b dark:border-slate-700 transition-colors duration-150 ${
                        isWinner
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        <div className="flex items-center">
                          {index + 1}
                          {isWinner && <TrophyIcon className="w-4 h-4 ml-2 text-yellow-500" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                         <button 
                            onClick={() => onCandidateSelect(candidate)}
                            className="text-left hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          >
                           {candidate.name}
                         </button>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">{candidate.votes.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="min-h-[300px] flex flex-col">
          <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-200">Vote Distribution</h4>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={300 + sortedCandidates.length * 10}>
              <BarChart
                layout="vertical"
                data={sortedCandidates}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100}
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  interval={0}
                />
                <Tooltip
                  contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.8)',
                      borderColor: '#475569',
                      color: '#f1f5f9',
                      borderRadius: '0.5rem'
                  }}
                  cursor={{ fill: 'rgba(71, 85, 105, 0.3)' }}
                />
                <Bar dataKey="votes" fill={district.colorHex} name="Total Votes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictResults;