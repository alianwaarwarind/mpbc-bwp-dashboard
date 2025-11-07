import React from 'react';
import { CandidateWithVotes } from '../types.ts';
import { DISTRICTS, TrophyIcon } from '../constants.tsx';

interface WinnersPodiumProps {
  winners: CandidateWithVotes[];
  onCandidateSelect: (candidate: CandidateWithVotes) => void;
}

const WinnersPodium: React.FC<WinnersPodiumProps> = ({ winners, onCandidateSelect }) => {
  if (winners.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center text-slate-500">
        Calculating winners...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {DISTRICTS.map(district => {
        const districtWinners = winners.filter(w => w.district === district.name);
        return (
          <div key={district.code} className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className={`p-4 border-b-4 ${district.color.replace('text-', 'border-')}`}>
              <h3 className={`text-xl font-bold ${district.color}`}>{district.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {district.reservedSeats} Winner{district.reservedSeats > 1 ? 's' : ''}
              </p>
            </div>
            <div className="p-4 space-y-3">
              {districtWinners.map((winner) => (
                <button
                  key={winner.serial}
                  onClick={() => onCandidateSelect(winner)}
                  className="w-full text-left bg-slate-50 dark:bg-slate-700/50 rounded-md p-3 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center">
                    <TrophyIcon className="w-5 h-5 mr-3 text-yellow-500" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{winner.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{winner.votes.toLocaleString()} votes</p>
                    </div>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 text-xs hidden sm:inline">Details →</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WinnersPodium;