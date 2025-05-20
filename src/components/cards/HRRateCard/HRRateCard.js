import React from 'react';
import './HRRateCard.css';

/**
 * HRRateCard - Displays players with the highest HR rate this season
 */
const HRRateCard = ({ 
  topHRRatePlayers, 
  isLoading,
  teams // Add teams prop
}) => {
  return (
    <div className="card hr-rate-card">
      <h3>Top HR Rate This Season</h3>
      {isLoading ? (
        <div className="loading-indicator">Loading stats...</div>
      ) : topHRRatePlayers.length > 0 ? (
        <div className="scrollable-container">
          <ul className="player-list">
            {topHRRatePlayers.map((player, index) => {
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
                      {(player.homeRunsThisSeason / player.gamesPlayed).toFixed(3)} HR/G
                    </div>
                    <small>{player.homeRunsThisSeason} HR in {player.gamesPlayed} games</small>
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
        <p className="no-data">No HR rate data available</p>
      )}
    </div>
  );
};

export default HRRateCard;