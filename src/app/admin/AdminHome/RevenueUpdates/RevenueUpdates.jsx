"use client";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./RevenueUpdates.css";

const data = [
  { date: "16/08", earnings: 3, expenses: 2 }, // changed to positive for better visualization
  { date: "17/08", earnings: 4, expenses: 2 },
  { date: "18/08", earnings: 3, expenses: 3 },
  { date: "19/08", earnings: 5, expenses: 2 },
  { date: "20/08", earnings: 3, expenses: 1 },
  { date: "21/08", earnings: 2.5, expenses: 2 },
];

const RevenueUpdates = () => {
  return (
    <div className="revenue-container">
      <div className="left">
        <h2>Revenue Updates</h2>
        <p className="subtitle">Overview of Profit</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} barGap={10}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 6]} />
            <Tooltip />
            <Bar
              dataKey="earnings"
              fill="#4c6ef5"
              radius={[5, 5, 0, 0]}
              name="Earnings"
            />
            <Bar
              dataKey="expenses"
              fill="#38bdf8"
              radius={[5, 5, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="right">
        <div className="dropdown">
            March 2024 <FiChevronDown style={{ verticalAlign: "middle", marginLeft: "6px" }} />
        </div>

        <h1 className="total">$63,489.50</h1>
        <p className="label">Total Earnings</p>

        <div className="summary">
          <span className="dot dot-earnings"></span>
          <div>
            <p>Earnings this month</p>
            <strong>$48,820</strong>
          </div>
        </div>

        <div className="summary">
          <span className="dot dot-expenses"></span>
          <div>
            <p>Expense this month</p>
            <strong>$26,498</strong>
          </div>
        </div>

        <button className="report-btn">View Full Report</button>
      </div>
    </div>
  );
};

export default RevenueUpdates;
