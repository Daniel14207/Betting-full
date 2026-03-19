import { TeamStats, PredictionResult } from '../types';

export function calculatePowerScore(stats: TeamStats) {
  const attackStrength = stats.matches > 0 ? stats.goalsScored / stats.matches : 0;
  const defenseWeakness = stats.matches > 0 ? stats.goalsConceded / stats.matches : 0;
  
  let formPoints = 0;
  stats.form.forEach(result => {
    if (result === 'W') formPoints += 3;
    if (result === 'D') formPoints += 1;
  });
  const formScore = formPoints;

  const powerScore = (attackStrength * 0.4) + (formScore * 0.4) - (defenseWeakness * 0.2);
  return { attackStrength, defenseWeakness, formScore, powerScore };
}

function poissonProbability(lambda: number, k: number): number {
  let p = Math.exp(-lambda);
  for (let i = 1; i <= k; i++) {
    p *= lambda / i;
  }
  return p;
}

export function generatePrediction(home: TeamStats, away: TeamStats): PredictionResult {
  const homePower = calculatePowerScore(home);
  const awayPower = calculatePowerScore(away);

  // Expected Goals (xG)
  // Simplified model: Home Advantage factor ~ 1.2
  const homeAdvantage = 1.2;
  const expectedGoalsA = Math.max(0.5, (homePower.attackStrength * awayPower.defenseWeakness * homeAdvantage));
  const expectedGoalsB = Math.max(0.5, (awayPower.attackStrength * homePower.defenseWeakness * (1 / homeAdvantage)));

  // Calculate probabilities using Poisson distribution up to 5 goals
  let winProbA = 0;
  let winProbDraw = 0;
  let winProbB = 0;

  const maxGoals = 5;
  let maxProb = 0;
  let mostLikelyScore = '0-0';
  let altScore = '1-1';
  let secondMaxProb = 0;

  for (let i = 0; i <= maxGoals; i++) {
    for (let j = 0; j <= maxGoals; j++) {
      const prob = poissonProbability(expectedGoalsA, i) * poissonProbability(expectedGoalsB, j);
      
      if (i > j) winProbA += prob;
      else if (i === j) winProbDraw += prob;
      else winProbB += prob;

      if (prob > maxProb) {
        secondMaxProb = maxProb;
        altScore = mostLikelyScore;
        maxProb = prob;
        mostLikelyScore = `${i}-${j}`;
      } else if (prob > secondMaxProb) {
        secondMaxProb = prob;
        altScore = `${i}-${j}`;
      }
    }
  }

  // Normalize probabilities
  const totalProb = winProbA + winProbDraw + winProbB;
  winProbA = (winProbA / totalProb) * 100;
  winProbDraw = (winProbDraw / totalProb) * 100;
  winProbB = (winProbB / totalProb) * 100;

  // Best Prediction
  let bestPrediction: '1' | 'X' | '2' = '1';
  let confidence = winProbA;
  if (winProbB > winProbA && winProbB > winProbDraw) {
    bestPrediction = '2';
    confidence = winProbB;
  } else if (winProbDraw > winProbA && winProbDraw > winProbB) {
    bestPrediction = 'X';
    confidence = winProbDraw;
  }

  // Risk Level
  let riskLevel: 'SAFE' | 'MEDIUM' | 'HIGH RISK' = 'MEDIUM';
  if (confidence > 65) riskLevel = 'SAFE';
  else if (confidence < 45) riskLevel = 'HIGH RISK';

  // Advanced & Safe Bets
  const totalExpectedGoals = expectedGoalsA + expectedGoalsB;
  const over15 = totalExpectedGoals > 1.8;
  const under45 = totalExpectedGoals < 4.2;
  const over25 = totalExpectedGoals > 2.6;
  const btts = expectedGoalsA > 0.8 && expectedGoalsB > 0.8;
  
  let doubleChance = '1X';
  if (bestPrediction === '1') doubleChance = '1X';
  else if (bestPrediction === '2') doubleChance = 'X2';
  else doubleChance = winProbA > winProbB ? '1X' : 'X2';

  let cleanSheet = 'No';
  if (expectedGoalsB < 0.6) cleanSheet = `${home.name} Yes`;
  else if (expectedGoalsA < 0.6) cleanSheet = `${away.name} Yes`;

  // VIP
  const comboBet = bestPrediction === '1' ? `1 & ${over15 ? 'Over 1.5' : 'Under 3.5'}` : 
                   bestPrediction === '2' ? `2 & ${over15 ? 'Over 1.5' : 'Under 3.5'}` : 
                   `X & ${under45 ? 'Under 4.5' : 'BTTS'}`;
  
  const highOdds = `${home.name} to win from behind (Odds: 8.50)`;

  return {
    matchCible: {
      bestPrediction,
      exactScore: mostLikelyScore,
      confidence: Math.round(confidence)
    },
    safeBets: {
      over15,
      under45,
      doubleChance
    },
    advanced: {
      btts,
      over25,
      cleanSheet
    },
    vip: {
      exactScoreAlt: altScore,
      comboBet,
      highOdds
    },
    analysis: {
      winProbA: Math.round(winProbA),
      winProbDraw: Math.round(winProbDraw),
      winProbB: Math.round(winProbB),
      expectedGoalsA: Number(expectedGoalsA.toFixed(2)),
      expectedGoalsB: Number(expectedGoalsB.toFixed(2)),
      powerScoreA: Number(homePower.powerScore.toFixed(1)),
      powerScoreB: Number(awayPower.powerScore.toFixed(1))
    },
    riskLevel
  };
}
