"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";

import "./EarningsCards.css";

const yearlyData = [
  { name: "2024", value: 80 },
  { name: "2023", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F"];

const monthlyLineData = [
  { month: "Jan", earnings: 3000 },
  { month: "Feb", earnings: 2000 },
  { month: "Mar", earnings: 4500 },
  { month: "Apr", earnings: 3500 },
  { month: "May", earnings: 5000 },
  { month: "Jun", earnings: 4000 },
];

const EarningsCards = () => {
  return (
    <div className="container-earn">
      {/* Yearly Breakup Card */}
      <div className="card yearly">
        <div className="header">
          <h3>Yearly Breakup</h3>
          <div className="chart-pie">
            <PieChart width={200} height={200}>
              <Pie
                data={yearlyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                label
              >
                {yearlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </div>
        </div>

        <div className="info">
          <div className="info-2">
          <h2>$36,358</h2>
          <div className="growth positive">
            <FiArrowUpRight />
            <span>+9% last year</span>
          </div>
          </div>
        </div>

        <div className="legend">
          <div>
            <span className="dot blue"></span> 2024
          </div>
          <div>
            <span className="dot lightblue"></span> 2023
          </div>
        </div>
      </div>

      {/* Monthly Earnings Card */}
      <div className="card monthly">
        <div className="header">
          <h3>Monthly Earnings</h3>
          <div className="icon-circle">
            <FaDollarSign color="white" />
          </div>
        </div>

        <div className="info">
          <div className="info-2">
          <h2>$6,820</h2>
          <div className="growth negative">
            <FiArrowDownRight />
            <span>-9% last year</span>
            </div>
          </div>
        </div>

        <div className="chart-line">
          <LineChart
            width={340}
            height={120}
            data={monthlyLineData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default EarningsCards;
