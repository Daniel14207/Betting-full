export interface TeamStats {
  name: string;
  league: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  form: ('W' | 'D' | 'L')[];
}

export interface PredictionResult {
  matchCible: {
    bestPrediction: '1' | 'X' | '2';
    exactScore: string;
    confidence: number;
  };
  safeBets: {
    over15: boolean;
    under45: boolean;
    doubleChance: string;
  };
  advanced: {
    btts: boolean;
    over25: boolean;
    cleanSheet: string;
  };
  vip: {
    exactScoreAlt: string;
    comboBet: string;
    highOdds: string;
  };
  analysis: {
    winProbA: number;
    winProbDraw: number;
    winProbB: number;
    expectedGoalsA: number;
    expectedGoalsB: number;
    powerScoreA: number;
    powerScoreB: number;
  };
  riskLevel: 'SAFE' | 'MEDIUM' | 'HIGH RISK';
}

export interface MatchPrediction {
  id: string;
  homeTeam: TeamStats;
  awayTeam: TeamStats;
  league: string;
  country: string;
  date: string;
  time: string;
  status: string;
  homeScore: number;
  awayScore: number;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  prediction: PredictionResult;
}
