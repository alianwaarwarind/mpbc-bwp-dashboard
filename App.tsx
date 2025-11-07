import React, { useState, useEffect, useMemo } from 'react';
import { CandidateWithVotes } from './types';
import { CANDIDATES, TEHSILS, DISTRICTS, TOTAL_ELECTORATE, TOTAL_SEATS, VotersIcon, SeatsIcon, UserIcon, VOTES_DATA } from './constants';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import WinnersPodium from './components/WinnersPodium';
import DistrictResults from './components/DistrictResults';
import ElectorateTable from './components/ElectorateTable';
import DivisionLeaderboard from './components/DivisionLeaderboard';
import CandidateModal from './components/CandidateModal';

const App: React.FC = () => {
  const [candidatesData, setCandidatesData] = useState<CandidateWithVotes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTehsil, setSelectedTehsil] = useState<string>('All Tehsils');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateWithVotes | null>(null);

  useEffect(() => {
    const processRealVotes = (): CandidateWithVotes[] => {
      return CANDIDATES.map(candidate => {
        const candidateVotesData = VOTES_DATA[candidate.name];
        const totalVotes = candidateVotesData
          ? Object.values(candidateVotesData).reduce((sum, currentVotes) => sum + currentVotes, 0)
          : 0;
        return { ...candidate, votes: totalVotes };
      });
    };

    const data = processRealVotes();
    setCandidatesData(data.sort((a, b) => b.votes - a.votes));
    setIsLoading(false);
  }, []);

  const winners = useMemo<CandidateWithVotes[]>(() => {
    if (candidatesData.length === 0) return [];
    const allWinners: CandidateWithVotes[] = [];
    DISTRICTS.forEach(district => {
      const districtCandidates = candidatesData
        .filter(c => c.district === district.name)
        .sort((a, b) => b.votes - a.votes);
      const districtWinners = districtCandidates.slice(0, district.reservedSeats);
      allWinners.push(...districtWinners);
    });
    return allWinners.sort((a, b) => b.votes - a.votes);
  }, [candidatesData]);

  const leaderboardData = useMemo<CandidateWithVotes[]>(() => {
    if (isLoading) return [];
    if (selectedTehsil === 'All Tehsils') {
      return candidatesData;
    }
    const filtered = CANDIDATES.map(c => ({
      ...c,
      votes: VOTES_DATA[c.name]?.[selectedTehsil] ?? 0,
    }));
    return filtered.sort((a, b) => b.votes - a.votes);
  }, [selectedTehsil, candidatesData, isLoading]);

  const handleSelectCandidate = (candidate: CandidateWithVotes) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
  };
  
  const selectedCandidateRank = useMemo(() => {
    if (!selectedCandidate) return 0;
    return candidatesData.findIndex(c => c.name === selectedCandidate.name) + 1;
  }, [selectedCandidate, candidatesData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <div className="text-xl font-semibold animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <main>
          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <SummaryCard title="Total Electorate" value={TOTAL_ELECTORATE.toLocaleString()} icon={<VotersIcon className="w-8 h-8 text-blue-500" />} />
            <SummaryCard title="Total Seats" value={TOTAL_SEATS.toString()} icon={<SeatsIcon className="w-8 h-8 text-green-500" />} />
            <SummaryCard title="Candidates" value={CANDIDATES.length.toString()} icon={<UserIcon className="w-8 h-8 text-orange-500" />} />
          </section>

          {/* Winners Gallery */}
          <section className="mb-8">
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-4 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              Election Winners
            </h2>
            <WinnersPodium 
              winners={winners}
              onCandidateSelect={handleSelectCandidate} 
            />
          </section>

          {/* Overall Division Leaderboard */}
          <section className="mb-8">
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-4 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              Overall Division Leaderboard
            </h2>
            <DivisionLeaderboard
              candidates={leaderboardData}
              tehsils={TEHSILS}
              selectedTehsil={selectedTehsil}
              onTehsilChange={setSelectedTehsil}
              onCandidateSelect={handleSelectCandidate}
            />
          </section>

          {/* District-wise Results */}
          <section className="mb-8">
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-6 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              District-wise Breakdown
            </h2>
            <div className="space-y-8">
              {DISTRICTS.map(district => (
                <DistrictResults
                  key={district.code}
                  district={district}
                  candidates={candidatesData.filter(c => c.district === district.name)}
                  onCandidateSelect={handleSelectCandidate}
                />
              ))}
            </div>
          </section>

          {/* Electorate Data Table */}
          <section>
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-6 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              Electorate by Tehsil
            </h2>
            <ElectorateTable tehsils={TEHSILS} />
          </section>
        </main>
      </div>
      {selectedCandidate && (
        <CandidateModal 
            candidate={selectedCandidate} 
            rank={selectedCandidateRank}
            onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default App;
