import React from 'react';
import './ImprovedRateCard.css';

/**
 * ImprovedRateCard - Shows players with the most improved HR rate compared to historical
 */
const ImprovedRateCard = ({ 
  improvedPlayers,
  isLoading,
  teams // Add teams prop
}) => {
  return (
    <div className="card improved-rate-card">
      <h3>Most Improved HR Rate</h3>
      {isLoading ? (
        <div className="loading-indicator">Loading stats...</div>
      ) : improvedPlayers && improvedPlayers.length > 0 ? (
        <div className="scrollable-container">
          <ul className="player-list">
            {improvedPlayers.map((player, index) => {
              // Get team logo URL if teams data is available
              const teamAbbr = player.team;
              const teamData = teams && teamAbbr ? teams[teamAbbr] : null;
              const logoUrl = teamData ? teamData.logoUrl : null;
              
              return (
                <li key={index} className="player-item">
                  <div className="player-rank">{index + 1}</div>
                  <div className="player-info">
                    <span className="player-name">{player.fullName || player.name}</span>
                    <span className="player-team">{player.team}</span>
                  </div>
                  <div className="player-stat">
                    <div className="stat-highlight">
                      +{((player.actualHRRate - player.historicalHRRate) * 100).toFixed(1)}%
                    </div>
                    <small>Current: {(player.actualHRRate * 100).toFixed(1)}%</small>
                    <small>Historical: {(player.historicalHRRate * 100).toFixed(1)}%</small>
                  </div>
                  
                  {/* Add team logo as background if available */}
                  {logoUrl && (
                    <img 
                      src={logoUrl} 
                      alt="" 
                      className="team-logo-bg" 
                      loading="lazy"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="no-data">No improved rate data available</p>
      )}
    </div>
  );
};

export default ImprovedRateCard;