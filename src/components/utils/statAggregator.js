/**
 * Compute the average stats for a player over the last N games
 * @param {Array} playerStats - Array of player stats
 * @param {number} limit - Number of games to consider
 * @returns {Object} - Object containing computed averages
 */
const fs = require('fs');
const path = require('path');

/**
 * Load latest N player stats from /data/player_stats_YYYY_MM_DD.json
 */
function loadRecentPlayerStats(dataDir, limit = 7) {
  const files = fs.readdirSync(dataDir)
    .filter(f => f.startsWith('player_stats_') && f.endsWith('.json'))
    .sort((a, b) => fs.statSync(path.join(dataDir, b)).mtime - fs.statSync(path.join(dataDir, a)).mtime)
    .slice(0, limit);

  const playerMap = new Map();

  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));

    data.forEach(player => {
      const key = `${player.name}_${player.team}`;
      if (!playerMap.has(key)) {
        playerMap.set(key, []);
      }
      playerMap.get(key).push(player);
    });
  });

  return playerMap;
}

/**
 * Compute ERA and WHIP for pitchers
 */
function computePitcherAverages(pitcherGames) {
  let ER = 0, IP = 0, BB = 0, H = 0;

  pitcherGames.forEach(p => {
    ER += Number(p.ER || 0);
    IP += Number(p.IP || 0);
    BB += Number(p.BB || 0);
    H += Number(p.H || 0);
  });

  const ERA = IP > 0 ? (ER * 9) / IP : 0;
  const WHIP = IP > 0 ? (BB + H) / IP : 0;

  return { ERA: +ERA.toFixed(2), WHIP: +WHIP.toFixed(2) };
}

/**
 * Compute AVG, SLG, HR rate for batters
 */
function computeBatterAverages(batterGames) {
  let AB = 0, H = 0, HR = 0, TB = 0;

  batterGames.forEach(p => {
    AB += Number(p.AB || 0);
    H += Number(p.H || 0);
    HR += Number(p.HR || 0);
    TB += Number(p.TB || (Number(p.H || 0) + Number(p.HR || 0) * 3)); // estimate
  });

  const AVG = AB > 0 ? H / AB : 0;
  const SLG = AB > 0 ? TB / AB : 0;
  const HRRate = AB > 0 ? HR / AB : 0;

  return {
    AVG: +AVG.toFixed(3),
    SLG: +SLG.toFixed(3),
    HRRate: +HRRate.toFixed(3),
    AB, HR
  };
}

module.exports = {
  loadRecentPlayerStats,
  computePitcherAverages,
  computeBatterAverages
};
