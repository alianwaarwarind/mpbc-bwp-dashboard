import React from 'react';
import { Tehsil, Candidate, District } from './types';

// Data Constants
export const TEHSILS: Tehsil[] = [
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

export const CANDIDATES: Candidate[] = [
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

export const DISTRICTS: District[] = [
    { name: 'Bahawalpur', code: 'BWP', reservedSeats: 3, color: 'text-blue-500', colorHex: '#3b82f6' },
    { name: 'Rahim Yar Khan', code: 'RYK', reservedSeats: 2, color: 'text-green-500', colorHex: '#22c55e' },
    { name: 'Bahawalnagar', code: 'BWN', reservedSeats: 1, color: 'text-orange-500', colorHex: '#f97316' },
];

export const TOTAL_ELECTORATE = TEHSILS.reduce((acc, tehsil) => acc + tehsil.totalElectorate, 0);
export const TOTAL_SEATS = DISTRICTS.reduce((acc, district) => acc + district.reservedSeats, 0);

// Real vote data for RYK & BWP candidates
export const VOTES_DATA: { [candidateName: string]: { [tehsilName: string]: number } } = {
  // RYK Candidates
  'Sardar Abdul Basit Khan Baloch': {
    'Bahawalpur': 520, 'Ahmadpur East': 190, 'Yazman': 57, 'Khairpur Tamewali': 24, 'Hasilpur': 88,
    'Rahim Yar Khan': 403, 'Sadiqabad': 141, 'Liaqatpur': 192, 'Khanpur': 163,
    'Chishtian': 77, 'Haroonabad': 53, 'Bahawalnagar': 162, 'Minchinabad': 108, 'Fort Abbas': 31
  },
  'Rao Abdul Rauf Khan': {
    'Bahawalpur': 361, 'Ahmadpur East': 190, 'Yazman': 69, 'Khairpur Tamewali': 29, 'Hasilpur': 107,
    'Rahim Yar Khan': 146, 'Sadiqabad': 121, 'Liaqatpur': 175, 'Khanpur': 267,
    'Chishtian': 168, 'Haroonabad': 58, 'Bahawalnagar': 233, 'Minchinabad': 67, 'Fort Abbas': 36
  },
  'Akhtar Ali Mehmood Chahour': {
    'Bahawalpur': 687, 'Ahmadpur East': 98, 'Yazman': 104, 'Khairpur Tamewali': 63, 'Hasilpur': 180,
    'Rahim Yar Khan': 273, 'Sadiqabad': 159, 'Liaqatpur': 187, 'Khanpur': 129,
    'Chishtian': 127, 'Haroonabad': 118, 'Bahawalnagar': 274, 'Minchinabad': 144, 'Fort Abbas': 78
  },
  'Mehar Allah Yar Sipra': {
    'Bahawalpur': 55, 'Ahmadpur East': 8, 'Yazman': 15, 'Khairpur Tamewali': 1, 'Hasilpur': 27,
    'Rahim Yar Khan': 40, 'Sadiqabad': 15, 'Liaqatpur': 8, 'Khanpur': 16,
    'Chishtian': 18, 'Haroonabad': 2, 'Bahawalnagar': 13, 'Minchinabad': 24, 'Fort Abbas': 16
  },
  'Muhammad Farooq Warind': {
    'Bahawalpur': 322, 'Ahmadpur East': 111, 'Yazman': 31, 'Khairpur Tamewali': 32, 'Hasilpur': 68,
    'Rahim Yar Khan': 313, 'Sadiqabad': 120, 'Liaqatpur': 121, 'Khanpur': 79,
    'Chishtian': 99, 'Haroonabad': 63, 'Bahawalnagar': 105, 'Minchinabad': 17, 'Fort Abbas': 31
  },
  'Ch. Muhammad Ramzan Shama': {
    'Bahawalpur': 347, 'Ahmadpur East': 108, 'Yazman': 85, 'Khairpur Tamewali': 18, 'Hasilpur': 51,
    'Rahim Yar Khan': 346, 'Sadiqabad': 117, 'Liaqatpur': 67, 'Khanpur': 43,
    'Chishtian': 127, 'Haroonabad': 54, 'Bahawalnagar': 220, 'Minchinabad': 85, 'Fort Abbas': 31
  },
  'Muhammad Zahoor Hassan': {
    'Bahawalpur': 14, 'Ahmadpur East': 2, 'Yazman': 0, 'Khairpur Tamewali': 5, 'Hasilpur': 5,
    'Rahim Yar Khan': 5, 'Sadiqabad': 19, 'Liaqatpur': 9, 'Khanpur': 4,
    'Chishtian': 9, 'Haroonabad': 4, 'Bahawalnagar': 8, 'Minchinabad': 11, 'Fort Abbas': 3
  },
  // BWP Candidates
  'Diwan Abdul Rashid Bokhari': {
    'Bahawalpur': 59, 'Ahmadpur East': 287, 'Yazman': 14, 'Khairpur Tamewali': 1, 'Hasilpur': 37,
    'Rahim Yar Khan': 102, 'Sadiqabad': 32, 'Liaqatpur': 62, 'Khanpur': 104,
    'Chishtian': 128, 'Haroonabad': 18, 'Bahawalnagar': 124, 'Minchinabad': 33, 'Fort Abbas': 18
  },
  'Hamid Akhtar': {
    'Bahawalpur': 172, 'Ahmadpur East': 46, 'Yazman': 14, 'Khairpur Tamewali': 3, 'Hasilpur': 11,
    'Rahim Yar Khan': 88, 'Sadiqabad': 22, 'Liaqatpur': 37, 'Khanpur': 54,
    'Chishtian': 31, 'Haroonabad': 18, 'Bahawalnagar': 42, 'Minchinabad': 58, 'Fort Abbas': 39
  },
  'Haji Muhammad Afzal Dharala': {
    'Bahawalpur': 289, 'Ahmadpur East': 89, 'Yazman': 54, 'Khairpur Tamewali': 35, 'Hasilpur': 180,
    'Rahim Yar Khan': 365, 'Sadiqabad': 144, 'Liaqatpur': 200, 'Khanpur': 143,
    'Chishtian': 98, 'Haroonabad': 83, 'Bahawalnagar': 301, 'Minchinabad': 124, 'Fort Abbas': 38
  },
  'M. Moazzam Kamal Wains': {
    'Bahawalpur': 36, 'Ahmadpur East': 18, 'Yazman': 19, 'Khairpur Tamewali': 11, 'Hasilpur': 143,
    'Rahim Yar Khan': 127, 'Sadiqabad': 85, 'Liaqatpur': 54, 'Khanpur': 48,
    'Chishtian': 62, 'Haroonabad': 26, 'Bahawalnagar': 84, 'Minchinabad': 31, 'Fort Abbas': 29
  },
  'Muhammad Mukhtar Qazi': {
    'Bahawalpur': 20, 'Ahmadpur East': 0, 'Yazman': 4, 'Khairpur Tamewali': 4, 'Hasilpur': 2,
    'Rahim Yar Khan': 10, 'Sadiqabad': 6, 'Liaqatpur': 2, 'Khanpur': 3,
    'Chishtian': 3, 'Haroonabad': 0, 'Bahawalnagar': 0, 'Minchinabad': 0, 'Fort Abbas': 0
  },
  'Muhammad Nasir Joiya': {
    'Bahawalpur': 524, 'Ahmadpur East': 110, 'Yazman': 61, 'Khairpur Tamewali': 19, 'Hasilpur': 50,
    'Rahim Yar Khan': 147, 'Sadiqabad': 119, 'Liaqatpur': 144, 'Khanpur': 194,
    'Chishtian': 30, 'Haroonabad': 41, 'Bahawalnagar': 119, 'Minchinabad': 65, 'Fort Abbas': 22
  },
  'Muhammad Umair Mohsin': {
    'Bahawalpur': 470, 'Ahmadpur East': 81, 'Yazman': 79, 'Khairpur Tamewali': 62, 'Hasilpur': 60,
    'Rahim Yar Khan': 236, 'Sadiqabad': 158, 'Liaqatpur': 137, 'Khanpur': 78,
    'Chishtian': 88, 'Haroonabad': 95, 'Bahawalnagar': 212, 'Minchinabad': 116, 'Fort Abbas': 28
  },
  'Sikander Hayat Nangaana': {
    'Bahawalpur': 434, 'Ahmadpur East': 36, 'Yazman': 46, 'Khairpur Tamewali': 34, 'Hasilpur': 127,
    'Rahim Yar Khan': 267, 'Sadiqabad': 64, 'Liaqatpur': 104, 'Khanpur': 84,
    'Chishtian': 119, 'Haroonabad': 54, 'Bahawalnagar': 107, 'Minchinabad': 31, 'Fort Abbas': 42
  },
  'Syed Faisal Abbas Shah': {
    'Bahawalpur': 183, 'Ahmadpur East': 16, 'Yazman': 33, 'Khairpur Tamewali': 3, 'Hasilpur': 32,
    'Rahim Yar Khan': 35, 'Sadiqabad': 40, 'Liaqatpur': 29, 'Khanpur': 11,
    'Chishtian': 54, 'Haroonabad': 5, 'Bahawalnagar': 13, 'Minchinabad': 10, 'Fort Abbas': 5
  },
  'Syed Zeeshan Haider': {
    'Bahawalpur': 794, 'Ahmadpur East': 262, 'Yazman': 116, 'Khairpur Tamewali': 45, 'Hasilpur': 101,
    'Rahim Yar Khan': 537, 'Sadiqabad': 233, 'Liaqatpur': 265, 'Khanpur': 254,
    'Chishtian': 179, 'Haroonabad': 104, 'Bahawalnagar': 316, 'Minchinabad': 131, 'Fort Abbas': 60
  },
  'Ch. Umar Mahmood': {
    'Bahawalpur': 409, 'Ahmadpur East': 98, 'Yazman': 89, 'Khairpur Tamewali': 29, 'Hasilpur': 51,
    'Rahim Yar Khan': 359, 'Sadiqabad': 165, 'Liaqatpur': 119, 'Khanpur': 146,
    'Chishtian': 156, 'Haroonabad': 86, 'Bahawalnagar': 212, 'Minchinabad': 90, 'Fort Abbas': 64
  },
  // BWN Candidates
  'Ghulam Nabi Sipra': {
    'Bahawalpur': 40, 'Ahmadpur East': 11, 'Yazman': 8, 'Khairpur Tamewali': 1, 'Hasilpur': 5,
    'Rahim Yar Khan': 6, 'Sadiqabad': 11, 'Liaqatpur': 2, 'Khanpur': 7,
    'Chishtian': 3, 'Haroonabad': 45, 'Bahawalnagar': 3, 'Minchinabad': 2, 'Fort Abbas': 17
  },
  'Imran Hussain Chatha': {
    'Bahawalpur': 364, 'Ahmadpur East': 109, 'Yazman': 72, 'Khairpur Tamewali': 49, 'Hasilpur': 137,
    'Rahim Yar Khan': 187, 'Sadiqabad': 111, 'Liaqatpur': 102, 'Khanpur': 138,
    'Chishtian': 220, 'Haroonabad': 69, 'Bahawalnagar': 112, 'Minchinabad': 55, 'Fort Abbas': 47
  },
  'Mian Muhammad Imran': {
    'Bahawalpur': 100, 'Ahmadpur East': 29, 'Yazman': 28, 'Khairpur Tamewali': 8, 'Hasilpur': 25,
    'Rahim Yar Khan': 194, 'Sadiqabad': 130, 'Liaqatpur': 145, 'Khanpur': 66,
    'Chishtian': 68, 'Haroonabad': 27, 'Bahawalnagar': 38, 'Minchinabad': 12, 'Fort Abbas': 26
  },
  'M. Kashif Khan Khakwani': {
    'Bahawalpur': 375, 'Ahmadpur East': 96, 'Yazman': 27, 'Khairpur Tamewali': 15, 'Hasilpur': 28,
    'Rahim Yar Khan': 192, 'Sadiqabad': 27, 'Liaqatpur': 21, 'Khanpur': 69,
    'Chishtian': 4, 'Haroonabad': 8, 'Bahawalnagar': 179, 'Minchinabad': 51, 'Fort Abbas': 6
  },
  'M. Masood ur Rashid Joiya': {
    'Bahawalpur': 361, 'Ahmadpur East': 129, 'Yazman': 52, 'Khairpur Tamewali': 15, 'Hasilpur': 75,
    'Rahim Yar Khan': 242, 'Sadiqabad': 97, 'Liaqatpur': 125, 'Khanpur': 115,
    'Chishtian': 35, 'Haroonabad': 33, 'Bahawalnagar': 208, 'Minchinabad': 113, 'Fort Abbas': 24
  }
};


// Icon Components
export const TrophyIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export const VotersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

export const SeatsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M20 10c0-2-2-4-4-4H8c-2.2 0-4 1.8-4 4v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7z"/>
        <path d="M4 10V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2"/><path d="M14 14v3"/><path d="M10 14v3"/>
    </svg>
);

export const UserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);