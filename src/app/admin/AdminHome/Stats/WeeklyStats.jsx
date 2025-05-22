'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Mon', value: 10 },
  { name: 'Tue', value: 15 },
  { name: 'Wed', value: 8 },
  { name: 'Thu', value: 12 },
  { name: 'Fri', value: 18 },
  { name: 'Sat', value: 15 },
  { name: 'Sun', value: 22 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#2E2E3A',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <div style={{
          width: 12,
          height: 2,
          background: '#638FFF',
          borderRadius: 1
        }}></div>
        Weekly Stats: <strong>{payload[0].value}</strong>
      </div>
    );
  }
  return null;
};

const WeeklyStats = () => {
  return (
    <div className="ws-card">
      <h3>Weekly Stats</h3>
      <p className="ws-subtitle">Average sales</p>

      <div className="ws-chart">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#638FFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#638FFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#638FFF"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={{ stroke: '#638FFF', strokeWidth: 2, r: 4, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="ws-stats-list">
        <div className="ws-stat-box">
          <div className="ws-icon purple" />
          <div className='topScalesScorers'>
            <p className="ws-title">Top Sales</p>
            <p>Johnathan Doe</p>
          </div>
          <span className="ws-value blue">+68</span>
        </div>

        <div className="ws-stat-box">
          <div className="ws-icon green" />
          <div className='topScalesScorers'>
            <p className="ws-title">Best Seller</p>
            <p>MaterialPro Admin</p>
          </div>
          <span className="ws-value green">+68</span>
        </div>

        <div className="ws-stat-box">
          <div className="ws-icon red" />
          <div className='topScalesScorers'>
            <p className="ws-title">Most Commented</p>
            <p>Ample Admin</p>
          </div>
          <span className="ws-value red">+68</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;
