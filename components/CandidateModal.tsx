import React, { useMemo, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { CandidateWithVotes } from '../types.ts';
import { VOTES_DATA, DISTRICTS, TEHSILS, TrophyIcon } from '../constants.tsx';

interface CandidateModalProps {
  candidate: CandidateWithVotes;
  rank: number;
  onClose: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, rank, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const districtVoteData = useMemo(() => {
    const candidateVotes = VOTES_DATA[candidate.name] || {};
    const districtTotals = DISTRICTS.map(district => {
        const districtTehsils = TEHSILS.filter(t => t.district === district.name);
        const votes = districtTehsils.reduce((sum, tehsil) => {
            return sum + (candidateVotes[tehsil.name] || 0);
        }, 0);
        return { name: district.name, votes, fill: district.colorHex };
    });
    return districtTotals.filter(d => d.votes > 0);
  }, [candidate.name]);

  const tehsilVoteData = useMemo(() => {
    const candidateVotes = VOTES_DATA[candidate.name] || {};
    return TEHSILS.map(tehsil => ({
        name: tehsil.name,
        district: tehsil.district,
        votes: candidateVotes[tehsil.name] || 0
    })).sort((a,b) => b.votes - a.votes);
  }, [candidate.name]);

  const topThreeTehsils = useMemo(() => tehsilVoteData.slice(0, 3), [tehsilVoteData]);

  const ChartContent: React.FC = () => {
      if (districtVoteData.length === 0) {
          return <div className="flex items-center justify-center h-full"><p className="text-slate-500">No votes recorded.</p></div>;
      }
      return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={districtVoteData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (percent > 0.05) ? (
                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
                            {`${(percent * 100).toFixed(0)}%`}
                        </text>
                    ) : null;
                }}
                outerRadius="80%"
                dataKey="votes"
                nameKey="name"
            >
                {districtVoteData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
            </Pie>
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    borderColor: '#475569',
                    color: '#f1f5f9',
                    borderRadius: '0.5rem'
                }}
            />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
      );
  }

  return (
    <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-modal-title"
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="sticky top-0 bg-white dark:bg-slate-800 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 z-10 flex justify-between items-start">
            <div>
                <h2 id="candidate-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{candidate.name}</h2>
                <div className="flex flex-wrap items-center gap-x-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <span>From: <strong className="font-semibold text-slate-700 dark:text-slate-300">{candidate.district}</strong></span>
                    <span>Total Votes: <strong className="font-semibold text-slate-700 dark:text-slate-300">{candidate.votes.toLocaleString()}</strong></span>
                    <span>Overall Rank: <strong className="font-semibold text-slate-700 dark:text-slate-300">#{rank}</strong></span>
                </div>
            </div>
          <button 
            onClick={onClose}
            aria-label="Close candidate details"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Vote Distribution Chart */}
            <div className="flex flex-col">
              <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-200">Vote Distribution by District</h3>
              <div className="flex-grow min-h-[250px] sm:min-h-[300px]">
                  <ChartContent />
              </div>
            </div>

            {/* Strongholds */}
            <div>
                 <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-200">Top 3 Strongholds</h3>
                 <div className="space-y-2">
                     {topThreeTehsils.map((tehsil, index) => (
                         <div key={tehsil.name} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg flex items-center justify-between">
                            <div className="flex items-center">
                                <TrophyIcon className={`w-5 h-5 mr-3 ${index === 0 ? 'text-yellow-500' : (index === 1 ? 'text-slate-400' : 'text-yellow-700')}`} />
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">{tehsil.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{tehsil.district}</p>
                                </div>
                            </div>
                            <p className="font-mono font-bold text-slate-700 dark:text-slate-300">{tehsil.votes.toLocaleString()}</p>
                         </div>
                     ))}
                 </div>
            </div>
          </div>

          {/* Tehsil Votes Table (Right Column) */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-200">All Votes by Tehsil</h3>
            <div className="overflow-y-auto flex-grow border dark:border-slate-700 rounded-lg max-h-[300px] lg:max-h-full">
                <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300 sticky top-0">
                        <tr>
                            <th scope="col" className="px-4 py-2">Tehsil</th>
                            <th scope="col" className="px-4 py-2">District</th>
                            <th scope="col" className="px-4 py-2 text-right">Votes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-700">
                    {tehsilVoteData.map((tehsil) => (
                        <tr key={tehsil.name} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                            <td className="px-4 py-2 font-medium text-slate-800 dark:text-slate-200">{tehsil.name}</td>
                            <td className="px-4 py-2">{tehsil.district}</td>
                            <td className="px-4 py-2 text-right font-mono">{tehsil.votes.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;