
export type DistrictName = 'Bahawalpur' | 'Rahim Yar Khan' | 'Bahawalnagar';

export interface Tehsil {
  district: DistrictName;
  name: string;
  lowerCourtVoters: number;
  highCourtVoters: number;
  totalElectorate: number;
}

export interface Candidate {
  district: DistrictName;
  serial: number;
  name: string;
}

export interface CandidateWithVotes extends Candidate {
  votes: number;
}

export interface District {
  name: DistrictName;
  code: 'BWP' | 'RYK' | 'BWN';
  reservedSeats: number;
  color: string;
  // FIX: Add missing 'colorHex' property to the District interface.
  colorHex: string;
}