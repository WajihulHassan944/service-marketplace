'use client'

import { useState } from 'react'
import './scopepricing.css'

const ScopePricing = ({ onNext, onBack, gigData, setGigData }) => {
  console.log(gigData);
  const [charCount, setCharCount] = useState({
    basic: gigData.packages.basic.description.length,
    standard: gigData.packages.standard.description.length,
    premium: gigData.packages.premium.description.length,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const [section, pkg, key] = name.split('.')

    if (section === 'packages') {
      
      setGigData((prev) => ({
        ...prev,
        packages: {
          ...prev.packages,
          [pkg]: {
            ...prev.packages[pkg],
            [key]: type === 'checkbox' ? checked : value,
          },
        },
      }))
    }
  }

  const handleDescriptionChange = (pkg, e) => {
    const newDescription = e.target.value
    setGigData((prev) => ({
      ...prev,
      packages: {
        ...prev.packages,
        [pkg]: {
          ...prev.packages[pkg],
          description: newDescription,
        },
      },
    }))
    setCharCount((prev) => ({ ...prev, [pkg]: newDescription.length }))
  }

  return (
    <div className="scope-container">
      <h2>Scope & Pricing</h2>
      <div className="packages-table">
        <table>
          <thead>
            <tr>
              <th>Packages</th>
              <th>Basic</th>
              <th>Standard</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Package Name</td>
              {['basic', 'standard', 'premium'].map((pkg) => (
                <td key={`name-${pkg}`}>
                  <input
                    type="text"
                    maxLength={50}
                    name={`packages.${pkg}.name`}
                    value={gigData.packages[pkg].name}
                    onChange={handleChange}
                    placeholder="Name your package"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td>Description</td>
              {['basic', 'standard', 'premium'].map((pkg) => (
                <td key={`desc-${pkg}`}>
                  <textarea
                    className="descBox"
                    name={`packages.${pkg}.description`}
                    value={gigData.packages[pkg].description}
                    onChange={(e) => handleDescriptionChange(pkg, e)}
                    maxLength={1200}
                    placeholder="Describe your offering"
                  />
                  <div className="char-count">{charCount[pkg]}/1200</div>
                </td>
              ))}
            </tr>

            {['price', 'deliveryTime', 'revisions', 'pages'].map((field) => (
              <tr key={field}>
                <td>
                  {{
                    price: 'Price ($)',
                    deliveryTime: 'Delivery Time (days)',
                    revisions: 'Revisions',
                    pages: 'Number of Pages',
                  }[field]}
                </td>
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <td key={`${field}-${pkg}`}>
                    <input
                      type="number"
                      name={`packages.${pkg}.${field}`}
                      value={gigData.packages[pkg][field]}
                      onChange={handleChange}
                      min="0"
                    />
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <td>After Project Support</td>
              {['basic', 'standard', 'premium'].map((pkg) => (
                <td key={`support-${pkg}`}>
                  <input
                    type="checkbox"
                    name={`packages.${pkg}.afterProjectSupport`}
                    checked={gigData.packages[pkg].afterProjectSupport}
                    onChange={handleChange}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="submit-container">
        <button className="back-btn" onClick={onBack}>Back</button>
        <button className="submit-btn" onClick={onNext}>Save & Continue</button>
      </div>
    </div>
  )
}

export default ScopePricing
