import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

// =================================================================================
// TYPES
// =================================================================================

type DistrictName = 'Bahawalpur' | 'Rahim Yar Khan' | 'Bahawalnagar';

interface Tehsil {
  district: DistrictName;
  name: string;
  lowerCourtVoters: number;
  highCourtVoters: number;
  totalElectorate: number;
}

interface Candidate {
  district: DistrictName;
  serial: number;
  name: string;
}

interface CandidateWithVotes extends Candidate {
  votes: number;
}

interface District {
  name: DistrictName;
  code: 'BWP' | 'RYK' | 'BWN';
  reservedSeats: number;
  color: string;
  colorHex: string;
}

// =================================================================================
// CONSTANTS & ICONS
// =================================================================================

const TEHSILS: Tehsil[] = [
  { district: 'Bahawalpur', name: 'Bahawalpur', lowerCourtVoters: 335, highCourtVoters: 1503, totalElectorate: 1838 },
  { district: 'Bahawalpur', name: 'Ahmadpur East', lowerCourtVoters: 84, highCourtVoters: 430, totalElectorate: 514 },
  { district: 'Bahawalpur', name: 'Hasilpur', lowerCourtVoters: 94, highCourtVoters: 249, totalElectorate: 343 },
  { district: 'Bahawalpur', name: 'Yazman', lowerCourtVoters: 44, highCourtVoters: 190, totalElectorate: 234 },
  { district: 'Bahawalpur', name: 'Khairpur Tamewali', lowerCourtVoters: 21, highCourtVoters: 81, totalElectorate: 102 },
  { district: 'Rahim Yar Khan', name: 'Rahim Yar Khan', lowerCourtVoters: 301, highCourtVoters: 850, totalElectorate: 1151 },
  { district: 'Rahim Yar Khan', name: 'Sadiqabad', lowerCourtVoters: 121, highCourtVoters: 366, totalElectorate: 487 },
  { district: 'Rahim Yar Khan', name: 'Liaqatpur', lowerCourtVoters: 120, highCourtVoters: 385, totalElectorate: 505 },
  { district: 'Rahim Yar Khan', name: 'Khanpur', lowerCourtVoters: 164, highCourtVoters: 320, totalElectorate: 484 },
  { district: 'Bahawalnagar', name: 'Bahawalnagar', lowerCourtVoters: 189, highCourtVoters: 556, totalElectorate: 745 },
  { district: 'Bahawalnagar', name: 'Chishtian', lowerCourtVoters: 135, highCourtVoters: 298, totalElectorate: 433 },
  { district: 'Bahawalnagar', name: 'Minchinabad', lowerCourtVoters: 95, highCourtVoters: 209, totalElectorate: 304 },
  { district: 'Bahawalnagar', name: 'Haroonabad', lowerCourtVoters: 70, highCourtVoters: 172, totalElectorate: 242 },
  { district: 'Bahawalnagar', name: 'Fort Abbas', lowerCourtVoters: 30, highCourtVoters: 123, totalElectorate: 153 },
];

const CANDIDATES: Candidate[] = [
  { district: 'Rahim Yar Khan', serial: 1, name: 'Sardar Abdul Basit Khan Baloch' },
  { district: 'Rahim Yar Khan', serial: 2, name: 'Rao Abdul Rauf Khan' },
  { district: 'Rahim Yar Khan', serial: 3, name: 'Akhtar Ali Mehmood Chahour' },
  { district: 'Rahim Yar Khan', serial: 4, name: 'Mehar Allah Yar Sipra' },
  { district: 'Rahim Yar Khan', serial: 5, name: 'Muhammad Farooq Warind' },
  { district: 'Rahim Yar Khan', serial: 6, name: 'Ch. Muhammad Ramzan Shama' },
  { district: 'Rahim Yar Khan', serial: 7, name: 'Muhammad Zahoor Hassan' },
  { district: 'Bahawalpur', serial: 1, name: 'Diwan Abdul Rashid Bokhari' },
  { district: 'Bahawalpur', serial: 2, name: 'Hamid Akhtar' },
  { district: 'Bahawalpur', serial: 3, name: 'Haji Muhammad Afzal Dharala' },
  { district: 'Bahawalpur', serial: 4, name: 'M. Moazzam Kamal Wains' },
  { district: 'Bahawalpur', serial: 5, name: 'Muhammad Mukhtar Qazi' },
  { district: 'Bahawalpur', serial: 6, name: 'Muhammad Nasir Joiya' },
  { district: 'Bahawalpur', serial: 7, name: 'Muhammad Umair Mohsin' },
  { district: 'Bahawalpur', serial: 8, name: 'Sikander Hayat Nangaana' },
  { district: 'Bahawalpur', serial: 9, name: 'Syed Faisal Abbas Shah' },
  { district: 'Bahawalpur', serial: 10, name: 'Syed Zeeshan Haider' },
  { district: 'Bahawalpur', serial: 11, name: 'Ch. Umar Mahmood' },
  { district: 'Bahawalnagar', serial: 1, name: 'Ghulam Nabi Sipra' },
  { district: 'Bahawalnagar', serial: 2, name: 'Imran Hussain Chatha' },
  { district: 'Bahawalnagar', serial: 3, name: 'Mian Muhammad Imran' },
  { district: 'Bahawalnagar', serial: 4, name: 'M. Kashif Khan Khakwani' },
  { district: 'Bahawalnagar', serial: 5, name: 'M. Masood ur Rashid Joiya' },
];

const DISTRICTS: District[] = [
    { name: 'Bahawalpur', code: 'BWP', reservedSeats: 3, color: 'text-blue-500', colorHex: '#3b82f6' },
    { name: 'Rahim Yar Khan', code: 'RYK', reservedSeats: 2, color: 'text-green-500', colorHex: '#22c55e' },
    { name: 'Bahawalnagar', code: 'BWN', reservedSeats: 1, color: 'text-orange-500', colorHex: '#f97316' },
];

const TOTAL_ELECTORATE = TEHSILS.reduce((acc, tehsil) => acc + tehsil.totalElectorate, 0);
const TOTAL_SEATS = DISTRICTS.reduce((acc, district) => acc + district.reservedSeats, 0);

const VOTES_DATA: { [candidateName: string]: { [tehsilName: string]: number } } = {
  'Sardar Abdul Basit Khan Baloch': { 'Bahawalpur': 520, 'Ahmadpur East': 190, 'Yazman': 57, 'Khairpur Tamewali': 24, 'Hasilpur': 88, 'Rahim Yar Khan': 403, 'Sadiqabad': 141, 'Liaqatpur': 192, 'Khanpur': 163, 'Chishtian': 77, 'Haroonabad': 53, 'Bahawalnagar': 162, 'Minchinabad': 108, 'Fort Abbas': 31 },
  'Rao Abdul Rauf Khan': { 'Bahawalpur': 361, 'Ahmadpur East': 190, 'Yazman': 69, 'Khairpur Tamewali': 29, 'Hasilpur': 107, 'Rahim Yar Khan': 146, 'Sadiqabad': 121, 'Liaqatpur': 175, 'Khanpur': 267, 'Chishtian': 168, 'Haroonabad': 58, 'Bahawalnagar': 233, 'Minchinabad': 67, 'Fort Abbas': 36 },
  'Akhtar Ali Mehmood Chahour': { 'Bahawalpur': 687, 'Ahmadpur East': 98, 'Yazman': 104, 'Khairpur Tamewali': 63, 'Hasilpur': 180, 'Rahim Yar Khan': 273, 'Sadiqabad': 159, 'Liaqatpur': 187, 'Khanpur': 129, 'Chishtian': 127, 'Haroonabad': 118, 'Bahawalnagar': 274, 'Minchinabad': 144, 'Fort Abbas': 78 },
  'Mehar Allah Yar Sipra': { 'Bahawalpur': 55, 'Ahmadpur East': 8, 'Yazman': 15, 'Khairpur Tamewali': 1, 'Hasilpur': 27, 'Rahim Yar Khan': 40, 'Sadiqabad': 15, 'Liaqatpur': 8, 'Khanpur': 16, 'Chishtian': 18, 'Haroonabad': 2, 'Bahawalnagar': 13, 'Minchinabad': 24, 'Fort Abbas': 16 },
  'Muhammad Farooq Warind': { 'Bahawalpur': 322, 'Ahmadpur East': 111, 'Yazman': 31, 'Khairpur Tamewali': 32, 'Hasilpur': 68, 'Rahim Yar Khan': 313, 'Sadiqabad': 120, 'Liaqatpur': 121, 'Khanpur': 79, 'Chishtian': 99, 'Haroonabad': 63, 'Bahawalnagar': 105, 'Minchinabad': 17, 'Fort Abbas': 31 },
  'Ch. Muhammad Ramzan Shama': { 'Bahawalpur': 347, 'Ahmadpur East': 108, 'Yazman': 85, 'Khairpur Tamewali': 18, 'Hasilpur': 51, 'Rahim Yar Khan': 346, 'Sadiqabad': 117, 'Liaqatpur': 67, 'Khanpur': 43, 'Chishtian': 127, 'Haroonabad': 54, 'Bahawalnagar': 220, 'Minchinabad': 85, 'Fort Abbas': 31 },
  'Muhammad Zahoor Hassan': { 'Bahawalpur': 14, 'Ahmadpur East': 2, 'Yazman': 0, 'Khairpur Tamewali': 5, 'Hasilpur': 5, 'Rahim Yar Khan': 5, 'Sadiqabad': 19, 'Liaqatpur': 9, 'Khanpur': 4, 'Chishtian': 9, 'Haroonabad': 4, 'Bahawalnagar': 8, 'Minchinabad': 11, 'Fort Abbas': 3 },
  'Diwan Abdul Rashid Bokhari': { 'Bahawalpur': 59, 'Ahmadpur East': 287, 'Yazman': 14, 'Khairpur Tamewali': 1, 'Hasilpur': 37, 'Rahim Yar Khan': 102, 'Sadiqabad': 32, 'Liaqatpur': 62, 'Khanpur': 104, 'Chishtian': 128, 'Haroonabad': 18, 'Bahawalnagar': 124, 'Minchinabad': 33, 'Fort Abbas': 18 },
  'Hamid Akhtar': { 'Bahawalpur': 172, 'Ahmadpur East': 46, 'Yazman': 14, 'Khairpur Tamewali': 3, 'Hasilpur': 11, 'Rahim Yar Khan': 88, 'Sadiqabad': 22, 'Liaqatpur': 37, 'Khanpur': 54, 'Chishtian': 31, 'Haroonabad': 18, 'Bahawalnagar': 42, 'Minchinabad': 58, 'Fort Abbas': 39 },
  'Haji Muhammad Afzal Dharala': { 'Bahawalpur': 289, 'Ahmadpur East': 89, 'Yazman': 54, 'Khairpur Tamewali': 35, 'Hasilpur': 180, 'Rahim Yar Khan': 365, 'Sadiqabad': 144, 'Liaqatpur': 200, 'Khanpur': 143, 'Chishtian': 98, 'Haroonabad': 83, 'Bahawalnagar': 301, 'Minchinabad': 124, 'Fort Abbas': 38 },
  'M. Moazzam Kamal Wains': { 'Bahawalpur': 36, 'Ahmadpur East': 18, 'Yazman': 19, 'Khairpur Tamewali': 11, 'Hasilpur': 143, 'Rahim Yar Khan': 127, 'Sadiqabad': 85, 'Liaqatpur': 54, 'Khanpur': 48, 'Chishtian': 62, 'Haroonabad': 26, 'Bahawalnagar': 84, 'Minchinabad': 31, 'Fort Abbas': 29 },
  'Muhammad Mukhtar Qazi': { 'Bahawalpur': 20, 'Ahmadpur East': 0, 'Yazman': 4, 'Khairpur Tamewali': 4, 'Hasilpur': 2, 'Rahim Yar Khan': 10, 'Sadiqabad': 6, 'Liaqatpur': 2, 'Khanpur': 3, 'Chishtian': 3, 'Haroonabad': 0, 'Bahawalnagar': 0, 'Minchinabad': 0, 'Fort Abbas': 0 },
  'Muhammad Nasir Joiya': { 'Bahawalpur': 524, 'Ahmadpur East': 110, 'Yazman': 61, 'Khairpur Tamewali': 19, 'Hasilpur': 50, 'Rahim Yar Khan': 147, 'Sadiqabad': 119, 'Liaqatpur': 144, 'Khanpur': 194, 'Chishtian': 30, 'Haroonabad': 41, 'Bahawalnagar': 119, 'Minchinabad': 65, 'Fort Abbas': 22 },
  'Muhammad Umair Mohsin': { 'Bahawalpur': 470, 'Ahmadpur East': 81, 'Yazman': 79, 'Khairpur Tamewali': 62, 'Hasilpur': 60, 'Rahim Yar Khan': 236, 'Sadiqabad': 158, 'Liaqatpur': 137, 'Khanpur': 78, 'Chishtian': 88, 'Haroonabad': 95, 'Bahawalnagar': 212, 'Minchinabad': 116, 'Fort Abbas': 28 },
  'Sikander Hayat Nangaana': { 'Bahawalpur': 434, 'Ahmadpur East': 36, 'Yazman': 46, 'Khairpur Tamewali': 34, 'Hasilpur': 127, 'Rahim Yar Khan': 267, 'Sadiqabad': 64, 'Liaqatpur': 104, 'Khanpur': 84, 'Chishtian': 119, 'Haroonabad': 54, 'Bahawalnagar': 107, 'Minchinabad': 31, 'Fort Abbas': 42 },
  'Syed Faisal Abbas Shah': { 'Bahawalpur': 183, 'Ahmadpur East': 16, 'Yazman': 33, 'Khairpur Tamewali': 3, 'Hasilpur': 32, 'Rahim Yar Khan': 35, 'Sadiqabad': 40, 'Liaqatpur': 29, 'Khanpur': 11, 'Chishtian': 54, 'Haroonabad': 5, 'Bahawalnagar': 13, 'Minchinabad': 10, 'Fort Abbas': 5 },
  'Syed Zeeshan Haider': { 'Bahawalpur': 794, 'Ahmadpur East': 262, 'Yazman': 116, 'Khairpur Tamewali': 45, 'Hasilpur': 101, 'Rahim Yar Khan': 537, 'Sadiqabad': 233, 'Liaqatpur': 265, 'Khanpur': 254, 'Chishtian': 179, 'Haroonabad': 104, 'Bahawalnagar': 316, 'Minchinabad': 131, 'Fort Abbas': 60 },
  'Ch. Umar Mahmood': { 'Bahawalpur': 409, 'Ahmadpur East': 98, 'Yazman': 89, 'Khairpur Tamewali': 29, 'Hasilpur': 51, 'Rahim Yar Khan': 359, 'Sadiqabad': 165, 'Liaqatpur': 119, 'Khanpur': 146, 'Chishtian': 156, 'Haroonabad': 86, 'Bahawalnagar': 212, 'Minchinabad': 90, 'Fort Abbas': 64 },
  'Ghulam Nabi Sipra': { 'Bahawalpur': 40, 'Ahmadpur East': 11, 'Yazman': 8, 'Khairpur Tamewali': 1, 'Hasilpur': 5, 'Rahim Yar Khan': 6, 'Sadiqabad': 11, 'Liaqatpur': 2, 'Khanpur': 7, 'Chishtian': 3, 'Haroonabad': 45, 'Bahawalnagar': 3, 'Minchinabad': 2, 'Fort Abbas': 17 },
  'Imran Hussain Chatha': { 'Bahawalpur': 364, 'Ahmadpur East': 109, 'Yazman': 72, 'Khairpur Tamewali': 49, 'Hasilpur': 137, 'Rahim Yar Khan': 187, 'Sadiqabad': 111, 'Liaqatpur': 102, 'Khanpur': 138, 'Chishtian': 220, 'Haroonabad': 69, 'Bahawalnagar': 112, 'Minchinabad': 55, 'Fort Abbas': 47 },
  'Mian Muhammad Imran': { 'Bahawalpur': 100, 'Ahmadpur East': 29, 'Yazman': 28, 'Khairpur Tamewali': 8, 'Hasilpur': 25, 'Rahim Yar Khan': 194, 'Sadiqabad': 130, 'Liaqatpur': 145, 'Khanpur': 66, 'Chishtian': 68, 'Haroonabad': 27, 'Bahawalnagar': 38, 'Minchinabad': 12, 'Fort Abbas': 26 },
  'M. Kashif Khan Khakwani': { 'Bahawalpur': 375, 'Ahmadpur East': 96, 'Yazman': 27, 'Khairpur Tamewali': 15, 'Hasilpur': 28, 'Rahim Yar Khan': 192, 'Sadiqabad': 27, 'Liaqatpur': 21, 'Khanpur': 69, 'Chishtian': 4, 'Haroonabad': 8, 'Bahawalnagar': 179, 'Minchinabad': 51, 'Fort Abbas': 6 },
  'M. Masood ur Rashid Joiya': { 'Bahawalpur': 361, 'Ahmadpur East': 129, 'Yazman': 52, 'Khairpur Tamewali': 15, 'Hasilpur': 75, 'Rahim Yar Khan': 242, 'Sadiqabad': 97, 'Liaqatpur': 125, 'Khanpur': 115, 'Chishtian': 35, 'Haroonabad': 33, 'Bahawalnagar': 208, 'Minchinabad': 113, 'Fort Abbas': 24 }
};

const TrophyIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);
const VotersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const SeatsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0-2-2-4-4-4H8c-2.2 0-4 1.8-4 4v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7z"/><path d="M4 10V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2"/><path d="M14 14v3"/><path d="M10 14v3"/></svg>
);
const UserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

// =================================================================================
// COMPONENTS
// =================================================================================

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 mt-8 border-t border-slate-200 dark:border-slate-700">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Made with ❤️ by{' '}
        <a href="https://alianwaarwarind.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
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
        <a href="https://alianwaarwarind.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          Ali Anwaar
        </a>
      </p>
      <p className="mt-4 max-w-3xl mx-auto text-base text-slate-500 dark:text-slate-400">
        An analytical view of the competition for the 6 total seats across the Bahawalpur Division. Results are visualized based on a hybrid allocation system, with reserved seats for each of the three districts.
      </p>
    </header>
  );
};

const SummaryCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => {
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

const WinnersPodium: React.FC<{ winners: CandidateWithVotes[]; onCandidateSelect: (candidate: CandidateWithVotes) => void; }> = ({ winners, onCandidateSelect }) => {
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
                <button key={winner.serial} onClick={() => onCandidateSelect(winner)} className="w-full text-left bg-slate-50 dark:bg-slate-700/50 rounded-md p-3 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
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

const DistrictResults: React.FC<{ district: District; candidates: CandidateWithVotes[]; onCandidateSelect: (candidate: CandidateWithVotes) => void; }> = ({ district, candidates, onCandidateSelect }) => {
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
                    <tr key={candidate.serial} className={`border-b dark:border-slate-700 transition-colors duration-150 ${isWinner ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        <div className="flex items-center">
                          {index + 1}
                          {isWinner && <TrophyIcon className="w-4 h-4 ml-2 text-yellow-500" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                         <button onClick={() => onCandidateSelect(candidate)} className="text-left hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded">
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
              <BarChart layout="vertical" data={sortedCandidates} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" width={100} tick={{fill: '#94a3b8', fontSize: 12}} interval={0}/>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', borderColor: '#475569', color: '#f1f5f9', borderRadius: '0.5rem' }} cursor={{ fill: 'rgba(71, 85, 105, 0.3)' }}/>
                <Bar dataKey="votes" fill={district.colorHex} name="Total Votes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const ElectorateTable: React.FC<{ tehsils: Tehsil[]; }> = ({ tehsils }) => {
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
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{tehsil.district}</td>
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

const DivisionLeaderboard: React.FC<{ candidates: CandidateWithVotes[]; tehsils: Tehsil[]; selectedTehsil: string; onTehsilChange: (tehsilName: string) => void; onCandidateSelect: (candidate: CandidateWithVotes) => void; }> = ({ candidates, tehsils, selectedTehsil, onTehsilChange, onCandidateSelect }) => {
  const getDistrictColor = (districtName: string): string => {
    return DISTRICTS.find(d => d.name === districtName)?.color || 'text-slate-500';
  }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <h4 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-2 sm:mb-0">
            Filter results by tehsil:
          </h4>
          <select aria-label="Filter results by tehsil" value={selectedTehsil} onChange={(e) => onTehsilChange(e.target.value)} className="w-full sm:w-auto bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition">
            <option value="All Tehsils">All Tehsils (Overall)</option>
            {tehsils.map((tehsil) => ( <option key={tehsil.name} value={tehsil.name}> {tehsil.name} </option> ))}
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
                    <tr key={`${candidate.serial}-${candidate.district}`} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/30 transition-colors duration-150">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white text-center"> {selectedTehsil === 'All Tehsils' ? index + 1 : '-'} </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                         <button onClick={() => onCandidateSelect(candidate)} className="text-left hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"> {candidate.name} </button>
                      </td>
                      <td className={`px-4 py-3 font-medium ${getDistrictColor(candidate.district)}`}> {candidate.district} </td>
                      <td className="px-4 py-3 text-right font-mono font-bold"> {candidate.votes.toLocaleString()} </td>
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

const CandidateModal: React.FC<{ candidate: CandidateWithVotes; rank: number; onClose: () => void; }> = ({ candidate, rank, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const districtVoteData = useMemo(() => {
    const candidateVotes = VOTES_DATA[candidate.name] || {};
    return DISTRICTS.map(district => ({
      name: district.name,
      votes: TEHSILS.filter(t => t.district === district.name).reduce((sum, tehsil) => sum + (candidateVotes[tehsil.name] || 0), 0),
      fill: district.colorHex
    })).filter(d => d.votes > 0);
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
            <Pie data={districtVoteData} cx="50%" cy="50%" labelLine={false}
                // FIX: Add types to recharts label properties to resolve arithmetic operation errors.
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number; }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (percent > 0.05) ? ( <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12"> {`${(percent * 100).toFixed(0)}%`} </text> ) : null;
                }}
                outerRadius="80%" dataKey="votes" nameKey="name">
                {districtVoteData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: '#475569', color: '#f1f5f9', borderRadius: '0.5rem' }} />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
      );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="candidate-modal-title">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="sticky top-0 bg-white dark:bg-slate-800 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 z-10 flex justify-between items-start">
            <div>
                <h2 id="candidate-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{candidate.name}</h2>
                <div className="flex flex-wrap items-center gap-x-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <span>From: <strong className="font-semibold text-slate-700 dark:text-slate-300">{candidate.district}</strong></span>
                    <span>Total Votes: <strong className="font-semibold text-slate-700 dark:text-slate-300">{candidate.votes.toLocaleString()}</strong></span>
                    <span>Overall Rank: <strong className="font-semibold text-slate-700 dark:text-slate-300">#{rank}</strong></span>
                </div>
            </div>
          <button onClick={onClose} aria-label="Close candidate details" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-200">Vote Distribution by District</h3>
              <div className="flex-grow min-h-[250px] sm:min-h-[300px]">
                  <ChartContent />
              </div>
            </div>
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


// =================================================================================
// APP COMPONENT
// =================================================================================

const App: React.FC = () => {
  const [candidatesData, setCandidatesData] = useState<CandidateWithVotes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTehsil, setSelectedTehsil] = useState<string>('All Tehsils');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateWithVotes | null>(null);

  useEffect(() => {
    const processRealVotes = (): CandidateWithVotes[] => {
      return CANDIDATES.map(candidate => {
        const candidateVotesData = VOTES_DATA[candidate.name];
        const totalVotes = candidateVotesData ? Object.values(candidateVotesData).reduce((sum, currentVotes) => sum + currentVotes, 0) : 0;
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
      const districtCandidates = candidatesData.filter(c => c.district === district.name).sort((a, b) => b.votes - a.votes);
      allWinners.push(...districtCandidates.slice(0, district.reservedSeats));
    });
    return allWinners.sort((a, b) => b.votes - a.votes);
  }, [candidatesData]);

  const leaderboardData = useMemo<CandidateWithVotes[]>(() => {
    if (isLoading) return [];
    if (selectedTehsil === 'All Tehsils') return candidatesData;
    return CANDIDATES.map(c => ({...c, votes: VOTES_DATA[c.name]?.[selectedTehsil] ?? 0,})).sort((a, b) => b.votes - a.votes);
  }, [selectedTehsil, candidatesData, isLoading]);
  
  const handleSelectCandidate = (candidate: CandidateWithVotes) => setSelectedCandidate(candidate);
  const handleCloseModal = () => setSelectedCandidate(null);
  
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
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <SummaryCard title="Total Electorate" value={TOTAL_ELECTORATE.toLocaleString()} icon={<VotersIcon className="w-8 h-8 text-blue-500" />} />
            <SummaryCard title="Total Seats" value={TOTAL_SEATS.toString()} icon={<SeatsIcon className="w-8 h-8 text-green-500" />} />
            <SummaryCard title="Candidates" value={CANDIDATES.length.toString()} icon={<UserIcon className="w-8 h-8 text-orange-500" />} />
          </section>
          <section className="mb-8">
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-4 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              Election Winners
            </h2>
            <WinnersPodium winners={winners} onCandidateSelect={handleSelectCandidate} />
          </section>
          <section className="mb-8">
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-4 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              Overall Division Leaderboard
            </h2>
            <DivisionLeaderboard candidates={leaderboardData} tehsils={TEHSILS} selectedTehsil={selectedTehsil} onTehsilChange={setSelectedTehsil} onCandidateSelect={handleSelectCandidate} />
          </section>
          <section className="mb-8">
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-6 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              District-wise Breakdown
            </h2>
            <div className="space-y-8">
              {DISTRICTS.map(district => (
                <DistrictResults key={district.code} district={district} candidates={candidatesData.filter(c => c.district === district.name)} onCandidateSelect={handleSelectCandidate} />
              ))}
            </div>
          </section>
          <section>
             <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 mb-6 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
              Electorate by Tehsil
            </h2>
            <ElectorateTable tehsils={TEHSILS} />
          </section>
        </main>
        <Footer />
      </div>
      {selectedCandidate && (
        <CandidateModal candidate={selectedCandidate} rank={selectedCandidateRank} onClose={handleCloseModal} />
      )}
    </div>
  );
};


// =================================================================================
// RENDERER
// =================================================================================

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);