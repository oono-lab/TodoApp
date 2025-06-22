import React from 'react';

interface WeeklyStatsProps {
  weeklyCompletedCount: number;
  onNavigate?: () => void;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({
  weeklyCompletedCount,
  onNavigate
}) => {
  return (
    <div
      className="weekly-stats-card"
      onClick={onNavigate}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onNavigate?.();
        }
      }}
    >
      <div className="stats-content">
        <div className="stats-icon">
          ✅
        </div>
        <div className="stats-text">
          <h4 className="stats-title">今週の達成</h4>
          <div className="stats-number">
            <span className="count">{weeklyCompletedCount}</span>
            <span className="unit">件</span>
          </div>
        </div>
        <div className="arrow-icon">
          →
        </div>
      </div>

      <style >{`
        .weekly-stats-card {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          border-radius: 16px;
          padding: 20px;
          margin-top: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
          border: none;
          user-select: none;
          position: relative;
          overflow: hidden;
        }

        .weekly-stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .weekly-stats-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .weekly-stats-card:hover::before {
          opacity: 1;
        }

        .weekly-stats-card:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        }

        .stats-content {
          display: flex;
          marginTop: 20px
          align-items: center;
          gap: 16px;
          color: white;
        }

        .stats-icon {
          font-size: 32px;
          opacity: 0.9;
        }

        .stats-text {
          flex: 1;
        }

        .stats-title {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 500;
          opacity: 0.9;
          letter-spacing: 0.5px;
        }

        .stats-number {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .count {
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
        }

        .unit {
          font-size: 16px;
          font-weight: 400;
          opacity: 0.8;
        }

        .arrow-icon {
          font-size: 20px;
          opacity: 0.7;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .weekly-stats-card:hover .arrow-icon {
          transform: translateX(4px);
          opacity: 1;
        }

        @media (max-width: 480px) {
          .weekly-stats-card {
            padding: 16px;
          }

          .stats-content {
            gap: 12px;
          }

          .stats-icon {
            font-size: 28px;
          }

          .stats-title {
            font-size: 14px;
          }

          .count {
            font-size: 24px;
          }

          .unit {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default WeeklyStats;