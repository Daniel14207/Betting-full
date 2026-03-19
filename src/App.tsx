import React, { useState, useEffect } from 'react';
import { mockTeams, upcomingMatches } from './data/mockData';
import { generatePrediction } from './utils/predictionEngine';
import { MatchPrediction, TeamStats } from './types';
import { Menu, ShoppingCart, Star, Flame, PlaySquare, Diamond, ArrowRightLeft, MoreHorizontal, ChevronRight, CheckCircle2, TrendingUp, Filter, Circle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('TIPS');
  const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
  const [showMorePopup, setShowMorePopup] = useState(false);

  useEffect(() => {
    const generated = upcomingMatches.map(match => {
      const homeTeam = mockTeams.find(t => t.name === match.home) as TeamStats;
      const awayTeam = mockTeams.find(t => t.name === match.away) as TeamStats;
      return {
        ...match,
        homeTeam,
        awayTeam,
        prediction: generatePrediction(homeTeam, awayTeam)
      };
    });
    setPredictions(generated);
  }, []);

  const dates = [
    { day: 'Tue', date: 'Mar 17', active: false },
    { day: 'Wed', date: 'Mar 18', active: false },
    { day: 'Thu', date: 'Mar 19', active: true },
    { day: 'Fri', date: 'Mar 20', active: false },
    { day: 'Sat', date: 'Mar 21', active: false },
  ];

  const bottomNav = [
    { id: 'TIPS', icon: Flame, label: 'TIPS' },
    { id: 'FREE', icon: Circle, label: 'FREE' },
    { id: 'BEST', icon: TrendingUp, label: 'BEST' },
    { id: 'LIVE', icon: PlaySquare, label: 'LIVE' },
    { id: 'VIP', icon: Diamond, label: 'VIP' },
    { id: 'HT-FT', icon: ArrowRightLeft, label: 'HT-FT' },
    { id: 'MORE', icon: MoreHorizontal, label: 'MORE' },
  ];

  // Group predictions by country/league for TIPS tab
  const groupedPredictions = predictions.reduce((acc, match) => {
    const key = `${match.country} - ${match.league}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(match);
    return acc;
  }, {} as Record<string, MatchPrediction[]>);

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white font-sans flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#0b0e17]">
        <button className="w-10 h-10 bg-[#facc15] rounded-lg flex items-center justify-center text-black">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-[#8b95a5]">
          {activeTab === 'BEST' ? 'Pronostics premium' : 'Betting Tips'}
        </h1>
        <div className="relative">
          <button className="w-10 h-10 bg-[#facc15] rounded-lg flex items-center justify-center text-black">
            <ShoppingCart className="w-6 h-6" />
          </button>
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">1</span>
        </div>
      </header>

      {/* Dates */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar shrink-0">
        {dates.map((date, i) => (
          <button key={i} className={`flex flex-col items-center justify-center min-w-[70px] py-2 rounded-lg ${date.active ? 'bg-[#facc15] text-black' : 'bg-[#1a2240] text-[#8b95a5]'}`}>
            <span className="text-sm font-medium">{date.day}</span>
            <span className="text-xs">{date.date}</span>
          </button>
        ))}
      </div>

      {/* Filters (Only on TIPS) */}
      {activeTab === 'TIPS' && (
        <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar shrink-0">
          <button className="px-6 py-2 bg-[#facc15] text-black rounded-full font-medium text-sm">Tous</button>
          <button className="px-6 py-2 bg-[#1a2240] text-[#8b95a5] rounded-full font-medium text-sm">Populaire</button>
          <button className="px-6 py-2 bg-[#1a2240] text-[#8b95a5] rounded-full font-medium text-sm">Favoris</button>
          <button className="w-10 h-10 bg-[#1a2240] text-[#8b95a5] rounded-full flex items-center justify-center shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'TIPS' && (
          <div>
            {Object.entries(groupedPredictions).map(([group, matches]) => {
              const [country, league] = group.split(' - ');
              return (
                <div key={group} className="bg-[#13182b] mt-2">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-[#1a2240]">
                    <div>
                      <div className="font-bold text-white">{country}</div>
                      <div className="text-sm text-[#8b95a5]">{league}</div>
                    </div>
                    <Star className="w-6 h-6 text-[#8b95a5]" />
                  </div>
                  
                  {matches.map(match => (
                    <div key={match.id} className="px-4 py-3 border-b border-[#1a2240]">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center w-12">
                            <span className="text-sm font-medium">{match.time}</span>
                            <span className="text-xs text-[#22c55e]">{match.status}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm">{match.homeTeam.name}</span>
                            <span className="text-sm">{match.awayTeam.name}</span>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex gap-1 text-xs text-[#8b95a5] w-full justify-around">
                              <span>1</span><span>X</span><span>2</span>
                            </div>
                            <div className="flex gap-1">
                              <span className={`px-2 py-1 text-xs border rounded ${match.prediction.matchCible.bestPrediction === '1' ? 'border-[#22c55e] text-[#22c55e]' : 'border-[#1a2240] text-[#8b95a5]'}`}>{match.odds.home.toFixed(2)}</span>
                              <span className={`px-2 py-1 text-xs border rounded ${match.prediction.matchCible.bestPrediction === 'X' ? 'border-[#22c55e] text-[#22c55e]' : 'border-[#1a2240] text-[#8b95a5]'}`}>{match.odds.draw.toFixed(2)}</span>
                              <span className={`px-2 py-1 text-xs border rounded ${match.prediction.matchCible.bestPrediction === '2' ? 'border-[#22c55e] text-[#22c55e]' : 'border-[#1a2240] text-[#8b95a5]'}`}>{match.odds.away.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            <span className="text-sm font-bold">{match.homeScore}</span>
                            <span className="text-sm font-bold">{match.awayScore}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <span className="text-xs text-[#8b95a5] flex items-center gap-1">cotes <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'BEST' && (
          <div className="px-4 py-4 space-y-4">
            {predictions.map(match => (
              <div key={match.id} className="bg-[#13182b] border border-[#2a3665] rounded-lg overflow-hidden">
                <div className="flex justify-between items-center px-4 py-2 border-b border-[#2a3665]">
                  <span className="text-xs text-[#8b95a5]">{match.country} - {match.league}</span>
                  <span className="text-xs text-[#8b95a5]">{match.time}</span>
                </div>
                <div className="px-4 py-6 flex justify-between items-center border-b border-[#2a3665]">
                  <span className="font-medium flex-1">{match.homeTeam.name}</span>
                  <div className="flex items-center gap-2 font-bold text-lg">
                    <span>{match.homeScore}</span>
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e] fill-[#22c55e]/20" />
                    <span>{match.awayScore}</span>
                  </div>
                  <span className="font-medium flex-1 text-right">{match.awayTeam.name}</span>
                </div>
                <div className="px-4 py-3 flex justify-between items-center bg-[#13182b]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-[#8b95a5] flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#8b95a5] rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">Over 1.5 Goals</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#facc15] text-black px-4 py-2 rounded-tl-lg font-bold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> 1.40
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0b0e17] border-t border-[#1a2240] flex justify-between px-2 py-2 z-40">
        {bottomNav.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => {
                if (item.id === 'MORE') {
                  setShowMorePopup(true);
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center w-14 gap-1 ${isActive ? 'text-[#facc15]' : 'text-[#8b95a5]'}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium uppercase">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* MORE Popup */}
      {showMorePopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end backdrop-blur-sm">
          <div className="bg-[#0b0e17] rounded-t-3xl w-full max-h-[90vh] overflow-y-auto border-t border-[#2a3665]">
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 bg-[#2a3665] rounded-full"></div>
            </div>
            <div className="px-6 py-2 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">More</h2>
              <button onClick={() => setShowMorePopup(false)} className="px-5 py-2 border border-[#2a3665] rounded-full text-sm font-medium hover:bg-[#1a2240] transition-colors">
                Fermer
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Section 1 */}
              <div>
                <h3 className="text-[#facc15] font-bold mb-4 text-lg">Pronostics 85% de réussite</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] rounded-2xl p-5 cursor-pointer hover:bg-white transition-colors">
                    <div className="font-bold text-[#0b0e17] mb-6 text-lg">Matchs et cotes</div>
                    <div className="text-[#22c55e] text-sm font-bold">Ouvrir</div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-2xl p-5 cursor-pointer hover:bg-white transition-colors">
                    <div className="font-bold text-[#0b0e17] mb-6 text-lg">Matchs du jour</div>
                    <div className="text-[#22c55e] text-sm font-bold">Ouvrir</div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-[#facc15] font-bold mb-4 text-lg">Pronostics sûrs du jour</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] rounded-2xl p-5 cursor-pointer hover:bg-white transition-colors">
                    <div className="font-bold text-[#0b0e17] mb-6 text-lg">Over/Under</div>
                    <div className="text-[#22c55e] text-sm font-bold">Ouvrir</div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-2xl p-5 cursor-pointer hover:bg-white transition-colors">
                    <div className="font-bold text-[#0b0e17] mb-6 text-lg">BTTS</div>
                    <div className="text-[#22c55e] text-sm font-bold">Ouvrir</div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="pb-8">
                <h3 className="text-[#facc15] font-bold mb-4 text-lg">Exclusif VIP</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#13182b] border-2 border-[#facc15] rounded-2xl p-5 relative cursor-pointer hover:bg-[#1a2240] transition-colors">
                    <div className="font-bold text-white mb-6 text-lg">Over 2.5</div>
                    <div className="text-white text-sm font-bold">Ouvrir</div>
                    <div className="absolute top-4 right-4 bg-[#facc15] text-black text-xs font-bold px-3 py-1 rounded-full">Vip</div>
                  </div>
                  <div className="bg-[#13182b] border-2 border-[#facc15] rounded-2xl p-5 relative cursor-pointer hover:bg-[#1a2240] transition-colors">
                    <div className="font-bold text-white mb-6 text-lg">BTTS - Oui</div>
                    <div className="text-white text-sm font-bold">Ouvrir</div>
                    <div className="absolute top-4 right-4 bg-[#facc15] text-black text-xs font-bold px-3 py-1 rounded-full">Vip</div>
                  </div>
                  <div className="bg-[#13182b] border-2 border-[#facc15] rounded-2xl p-5 relative cursor-pointer hover:bg-[#1a2240] transition-colors">
                    <div className="font-bold text-white mb-6 text-lg">Under 2.5</div>
                    <div className="text-white text-sm font-bold">Ouvrir</div>
                    <div className="absolute top-4 right-4 bg-[#facc15] text-black text-xs font-bold px-3 py-1 rounded-full">Vip</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
