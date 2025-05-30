import React from 'react';

/**
 * Component for displaying information about the games history setting
 * Explains to users what the setting does and how it affects performance charts
 * 
 * @param {number} gamesHistory - Current number of games setting
 * @param {string} playerType - Type of player (hitter or pitcher) this legend applies to
 */
const GameHistoryLegend = ({ gamesHistory, playerType = "player" }) => {
  // Format player type for display
  const formattedPlayerType = playerType.charAt(0).toUpperCase() + playerType.slice(1);
  
  return (
    <div className={`game-history-legend ${playerType}-legend`}>
      <h4>About {formattedPlayerType} Games History Setting</h4>
      <p>
        The "{formattedPlayerType} Games History" setting controls how many previous games are displayed in {playerType} performance charts.
        Currently set to show <strong>{gamesHistory} {gamesHistory === 1 ? 'game' : 'games'}</strong> of history.
      </p>
      
      <div className="legend-benefits">
        <h5>Benefits:</h5>
        <ul>
          <li><strong>More games (5-7):</strong> See longer-term trends and patterns across more appearances</li>
          <li><strong>Fewer games (1-3):</strong> Focus on the most recent performances for recency bias</li>
        </ul>
      </div>
      
      <div className="legend-examples">
        <div className="legend-example">
          <div className="legend-bar shorter-history"></div>
          <span>Fewer games: More focused on recent form</span>
        </div>
        <div className="legend-example">
          <div className="legend-bar longer-history"></div>
          <span>More games: Better for identifying longer trends</span>
        </div>
      </div>
      
      <p className="legend-note">
        Note: Changing this setting refreshes {playerType} data and may take a moment to load.
      </p>
    </div>
  );
};

export default GameHistoryLegend;