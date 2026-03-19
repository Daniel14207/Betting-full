import { TeamStats } from '../types';

export const upcomingMatches = [
  { id: '1', home: 'Palmeiras', away: 'Botafogo', league: 'Brasileirão Betano', country: 'Brazil', date: 'Thu Mar 19', time: '01:00', status: 'FT', homeScore: 2, awayScore: 1, odds: { home: 1.46, draw: 4.10, away: 7.00 } },
  { id: '2', home: 'Bahia', away: 'Red Bull Bragantino', league: 'Serie A', country: 'Brazil', date: 'Thu Mar 19', time: '01:00', status: 'FT', homeScore: 2, awayScore: 0, odds: { home: 1.61, draw: 3.75, away: 5.50 } },
  { id: '3', home: 'Athletico', away: 'Cruzeiro', league: 'Serie A', country: 'Brazil', date: 'Thu Mar 19', time: '01:30', status: 'FT', homeScore: 2, awayScore: 1, odds: { home: 2.10, draw: 3.20, away: 3.60 } },
  { id: '4', home: 'Mirassol', away: 'Coritiba', league: 'Serie B', country: 'Brazil', date: 'Thu Mar 19', time: '02:00', status: 'FT', homeScore: 0, awayScore: 1, odds: { home: 1.61, draw: 3.60, away: 6.00 } },
  { id: '5', home: 'Deportivo Pasto', away: 'Chico FC', league: 'Primera A', country: 'Colombia', date: 'Thu Mar 19', time: '00:10', status: 'FT', homeScore: 2, awayScore: 0, odds: { home: 1.40, draw: 3.50, away: 6.00 } },
];

export const mockTeams: TeamStats[] = [
  { name: 'Palmeiras', league: 'Brasileirão Betano', matches: 38, wins: 21, draws: 11, losses: 6, goalsScored: 64, goalsConceded: 33, form: ['W', 'W', 'D', 'W', 'W'] },
  { name: 'Botafogo', league: 'Brasileirão Betano', matches: 38, wins: 18, draws: 10, losses: 10, goalsScored: 58, goalsConceded: 37, form: ['L', 'D', 'D', 'W', 'L'] },
  { name: 'Bahia', league: 'Serie A', matches: 38, wins: 12, draws: 8, losses: 18, goalsScored: 50, goalsConceded: 53, form: ['W', 'L', 'W', 'L', 'D'] },
  { name: 'Red Bull Bragantino', league: 'Serie A', matches: 38, wins: 17, draws: 11, losses: 10, goalsScored: 49, goalsConceded: 35, form: ['L', 'L', 'W', 'D', 'L'] },
  { name: 'Athletico', league: 'Serie A', matches: 38, wins: 14, draws: 14, losses: 10, goalsScored: 51, goalsConceded: 43, form: ['W', 'D', 'D', 'W', 'L'] },
  { name: 'Cruzeiro', league: 'Serie A', matches: 38, wins: 11, draws: 14, losses: 13, goalsScored: 35, goalsConceded: 32, form: ['L', 'D', 'W', 'L', 'D'] },
  { name: 'Mirassol', league: 'Serie B', matches: 38, wins: 18, draws: 9, losses: 11, goalsScored: 41, goalsConceded: 31, form: ['W', 'W', 'L', 'W', 'D'] },
  { name: 'Coritiba', league: 'Serie B', matches: 38, wins: 14, draws: 8, losses: 16, goalsScored: 40, goalsConceded: 41, form: ['L', 'W', 'L', 'L', 'W'] },
  { name: 'Deportivo Pasto', league: 'Primera A', matches: 20, wins: 8, draws: 6, losses: 6, goalsScored: 24, goalsConceded: 20, form: ['W', 'W', 'D', 'L', 'W'] },
  { name: 'Chico FC', league: 'Primera A', matches: 20, wins: 5, draws: 8, losses: 7, goalsScored: 18, goalsConceded: 22, form: ['L', 'D', 'L', 'D', 'W'] },
];
