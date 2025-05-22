'use client';
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { BiTrendingUp } from "react-icons/bi"
import { FiArrowUpRight } from 'react-icons/fi';
import './EarningAnalytics.css';
const revenueData = [
  { name: "Jan", Footwear: 0.5, Fashionware: 0.8 },
  { name: "Feb", Footwear: 1.0, Fashionware: 1.2 },
  { name: "Mar", Footwear: 1.5, Fashionware: 1.0 },
  { name: "Apr", Footwear: 2.0, Fashionware: 2.5 },
  { name: "May", Footwear: 3.0, Fashionware: 1.5 },
];

const lineData = [
  { name: 'Mon', value: 2 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 1.5 },
  { name: 'Thu', value: 3.2 },
  { name: 'Fri', value: 2.5 },
];

const pieData = [{ name: 'Expense', value: 25 }, { name: 'Sales', value: 75 }];
const pieColors = ['#f59e0b', '#3b82f6'];
const pieColorsAnother = ['#5d87ff','#49beff'];
const EarningAnalytics = () => {
  return (
    <div className="dashboard-ui">
      {/* Welcome */}
      <div className="card welcome wide">
        <div>
          <div className='flexed-div'>
            <img src="/assets/myimg.jpg" alt="avatar" className="avatar" />
            <h3>Welcome back Mathew Anderson!</h3>
          </div>
          <div className='flexed-div'>
            <p className="sales">
              $2,340 <BiTrendingUp style={{ color: "rgb(19, 222, 185)", verticalAlign: "middle" }} />
              <span>Today’s Sales</span>
            </p>
            <p className="performance">
              35% <BiTrendingUp style={{ color: "rgb(19, 222, 185)", verticalAlign: "middle" }} />
              <span>Overall Performance</span>
            </p>
          </div>
        </div>
        <img src="/assets/admin/welcome-bg.svg" className="bg-img" />
      </div>

      {/* Expense Pie */}
      <div className="card stat">
        <h4>$10,230</h4>
        <p>Expense</p>
        <PieChart width={140} height={120}>
          <Tooltip contentStyle={{ fontSize: '12px' }} />
          <Pie data={pieData} innerRadius={35} outerRadius={50} dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Sales Bar */}
      <div className="card stat">
        <h4>$65,432</h4>
        <p>Sales</p>
        <BarChart width={140} height={120} data={revenueData}>
          <Tooltip contentStyle={{ fontSize: '12px' }} />
          <Bar dataKey="Footwear" fill="#3b82f6" barSize={20} radius={[5, 5, 0, 0]} />
        </BarChart>
      </div>

      {/* Revenue Update */}
      <div className="card revenue wide">
  <h4>Revenue Updates</h4>
  <p className="small">Overview of Profit</p>
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={revenueData}>
      <XAxis
        dataKey="name"
        tick={{ fontSize: 12, fill: "#64748b" }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 12, fill: "#64748b" }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip
        contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
        labelStyle={{ fontWeight: "bold", color: "#334155" }}
      />
      <Bar
        dataKey="Footwear"
        fill="#3b82f6"
        radius={[6, 6, 0, 0]}
        barSize={20}
      />
      <Bar
        dataKey="Fashionware"
        fill="#10b981"
        radius={[6, 6, 0, 0]}
        barSize={20}
      />
    </BarChart>
  </ResponsiveContainer>
</div>


      {/* Sales Overview */}
<div className="card mini double">
  <h4>Sales Overview</h4>
  <p className="small">Every Month</p>
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        innerRadius={70}
        outerRadius={90}
        startAngle={90}
        endAngle={-270}
        paddingAngle={2}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={pieColorsAnother[index]} />
        ))}
      </Pie>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="18"
        fontWeight="600"
        fill="#64748b"
      >
        $500,458
      </text>
    </PieChart>
  </ResponsiveContainer>

  <div className="legends">
    <span><span className="dot blue"></span> $23,450 Profit</span>
    <span><span className="dot cyan"></span> $23,450 Expense</span>
  </div>
</div>

      {/* Combined Mini Card */}
      <div className="card mini double">
        <div>
          <p className="mini-title">$16.5k Sales</p>
          <p className="growth">24% Growth <FiArrowUpRight /></p>
        </div>
        <div className="mini-chart">
          <p>Monthly Earnings</p>
          <p className="amount">$6,820 <span>+9%</span></p>
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={lineData}>
              <Tooltip contentStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EarningAnalytics;
