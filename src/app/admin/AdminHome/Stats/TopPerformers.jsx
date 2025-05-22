import React from 'react';
import './Dashboard.css';
import { FiChevronDown } from 'react-icons/fi';


const data = [
  {
    name: 'Sunil Joshi',
    role: 'Web Designer',
    project: 'Elite Admin',
    priority: 'Low',
    budget: '$3.9K',
    color: 'blue',
    image: '/assets/myimg.jpg',
  },
  {
    name: 'John Deo',
    role: 'Web Developer',
    project: 'Flexy Admin',
    priority: 'Medium',
    budget: '$24.5K',
    color: 'orange',
    image: '/assets/myimg.jpg',
  },
  {
    name: 'Nirav Joshi',
    role: 'Web Manager',
    project: 'Material Pro',
    priority: 'High',
    budget: '$12.8K',
    color: 'blue',
    image: '/assets/myimg.jpg',
  },
  {
    name: 'Yuvraj Sheth',
    role: 'Project Manager',
    project: 'Xtreme Admin',
    priority: 'Low',
    budget: '$4.8K',
    color: 'green',
    image: '/assets/myimg.jpg',
  },
  {
    name: 'Micheal Doe',
    role: 'Content Writer',
    project: 'Helping Hands WP Theme',
    priority: 'High',
    budget: '$9.3K',
    color: 'red',
    image: '/assets/myimg.jpg',
  },
];

const TopPerformers = () => {
  return (
    <div className="tp-card">
      <div className="tp-header">
        <div className="tp-header-2">
          <h3>Top Performers</h3>
          <p className="tp-subtitle">Best Employees</p>
        </div>
        <select className="tp-dropdown">
          <option> March 2024 <FiChevronDown style={{ verticalAlign: "middle", marginLeft: "6px", fontWeight:"300", fontSize: "16px" }} /></option>
        </select>
      </div>

      <table className="tp-table">
        <thead>
          <tr>
            <th>Assigned</th>
            <th>Project</th>
            <th>Priority</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp, index) => (
            <tr key={index}>
              <td>
                <div className="tp-profile-info">
                  <img src={emp.image} alt={emp.name} className="tp-avatar" />
                  <div>
                    <p className="tp-bold">{emp.name}</p>
                    <p className="tp-role">{emp.role}</p>
                  </div>
                </div>
              </td>
              <td>{emp.project}</td>
              <td>
                <span className={`tp-badge ${emp.color}`}>{emp.priority}</span>
              </td>
              <td>{emp.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformers;
