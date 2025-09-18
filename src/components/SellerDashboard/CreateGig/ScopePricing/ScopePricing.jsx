'use client';

import { useState } from 'react';
import './scopepricing.css';


const ScopePricing = ({ onNext, onBack, gigData, setGigData }) => {
  const [charCount, setCharCount] = useState({
    basic: gigData.packages.basic?.known?.description?.length || 0,
    standard: gigData.packages.standard?.known?.description?.length || 0,
    premium: gigData.packages.premium?.known?.description?.length || 0,
  });
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const [section, pkg, group, key] = name.split('.');

  if (section === 'packages') {
    let parsedValue = value;

    // Force number conversion for specific known keys
    if (['price', 'deliveryTime', 'revisions'].includes(key)) {
      parsedValue = Number(value);
    } else if (type === 'checkbox') {
      parsedValue = checked;
    }

    setGigData((prev) => ({
      ...prev,
      packages: {
        ...prev.packages,
        [pkg]: {
          ...prev.packages[pkg],
          [group]: {
            ...prev.packages[pkg][group],
            [key]: parsedValue,
          },
        },
      },
    }));
  }
};

  const handleDescriptionChange = (pkg, e) => {
    const newDescription = e.target.value;
    setGigData((prev) => ({
      ...prev,
      packages: {
        ...prev.packages,
        [pkg]: {
          ...prev.packages[pkg],
          known: {
            ...prev.packages[pkg].known,
            description: newDescription,
          },
        },
      },
    }));
    setCharCount((prev) => ({ ...prev, [pkg]: newDescription.length }));
  };


  const handleTogglePackages = (enabled) => {
    setGigData((prev) => {
      const updated = {
        ...prev,
        offerPackages: enabled,
        packages: {
          ...prev.packages,
          standard: prev.packages.standard || { known: {}, dynamic: {} },
          ...(enabled
            ? {
                basic: prev.packages.basic || { known: {}, dynamic: {} },
                premium: prev.packages.premium || { known: {}, dynamic: {} },
              }
            : {
                basic: { known: {}, dynamic: {} },
                premium: { known: {}, dynamic: {} },
              }),
        },
      };
      return updated;
    });
  };

  const visiblePackages = gigData.offerPackages
    ? ['basic', 'standard', 'premium']
    : ['standard'];

const fieldLabels = {
  packages: "Package(s) Pricing"
};
const modificationFields = gigData?.modificationRequests?.filter((req) =>
  ["packages"].includes(req.field)
);
  return (
    <div className="scope-container">
    
{modificationFields?.length > 0 && (
  <div className="modification-alert">
    <h3>⚠️ Modification Required</h3>
    <ul>
      {modificationFields.map((req) => (
        <li key={req._id}>
          <strong>{fieldLabels[req.field] || req.field} :</strong> {req.reason}
        </li>
      ))}
    </ul>
  </div>
)}

      <form
  onSubmit={(e) => {
    e.preventDefault();
    // HTML5 validation will block if required fields are empty
    onNext();
  }}
>
      <div
        className="scope-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h2>Scope & Pricing</h2>
      
       <label className="toggle-container">
  <span>Enable Packages</span>
  <input
    type="checkbox"
    checked={gigData.offerPackages}
    onChange={(e) => handleTogglePackages(e.target.checked)}
  />
  <span className="slider"></span>
</label>

      </div>

      <div className="packages-table">
        <table>
          <thead>
            <tr>
              <th>Packages</th>
              {visiblePackages.map((pkg) => (
                <th key={`head-${pkg}`}>{pkg.charAt(0).toUpperCase() + pkg.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="required">Package Name</td>
              {visiblePackages.map((pkg) => (
                <td key={`name-${pkg}`}>
                  <input
                    type="text"
                    maxLength={50}
                    required
                    name={`packages.${pkg}.known.packageName`}
                    value={gigData.packages[pkg].known?.packageName || ''}
                    onChange={handleChange}
                    placeholder="Name your package"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="required">Description</td>
              {visiblePackages.map((pkg) => (
                <td key={`desc-${pkg}`}>
                  <textarea
                    className="descBox"
                    required
                    name={`packages.${pkg}.known.description`}
                    value={gigData.packages[pkg].known?.description || ''}
                    onChange={(e) => handleDescriptionChange(pkg, e)}
                    maxLength={100}
                    placeholder="Describe your offering"
                  />
                  {/* <div className="char-count">{charCount[pkg]}/100</div> */}
                </td>
              ))}
            </tr>

            {['price', 'deliveryTime', 'revisions'].map((field) => (
              <tr key={field}>
                <td className="required">
                  {{
                    price: 'Price ($)',
                    deliveryTime: 'Delivery Time (days)',
                    revisions: 'Revisions',
                  }[field]}
                </td>
                {visiblePackages.map((pkg) => (
                  <td key={`${field}-${pkg}`}>
                    <input
                      type="number"
                      required
                      name={`packages.${pkg}.known.${field}`}
                      value={gigData.packages[pkg].known?.[field] ?? ''}
                      onChange={handleChange}
                      min="0"
                    />
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <td>After Project Support</td>
              {visiblePackages.map((pkg) => (
                <td key={`support-${pkg}`}>
                  <input
                    type="checkbox"
                    name={`packages.${pkg}.known.afterProjectSupport`}
                    checked={gigData.packages[pkg].known?.afterProjectSupport || false}
                    onChange={handleChange}
                  />
                </td>
              ))}
            </tr>

            {/* Dynamic Fields */}
            {(gigData.packages.standard.dynamic &&
              Object.keys(gigData.packages.standard.dynamic).map((field) => (
                <tr key={`dynamic-${field}`}>
                  <td>{field}</td>
                  {visiblePackages.map((pkg) => (
                    <td key={`dynamic-${field}-${pkg}`}>
                      <input
                        type="text"
                        name={`packages.${pkg}.dynamic.${field}`}
                        value={gigData.packages[pkg].dynamic?.[field] || ''}
                        onChange={handleChange}
                        placeholder={`Enter ${field}`}
                      />
                    </td>
                  ))}
                </tr>
              ))) || null}
          </tbody>
        </table>
      </div>

    {/* Navigation Row */}
<div className="form-actions">
  <div className="left-actions">
    <button
      type="button"
      onClick={() => {
        const newKey = prompt('Enter new field name (e.g., customNote):');
        if (!newKey) return;

        setGigData((prev) => {
          const updated = { ...prev };
          const targets = prev.offerPackages
            ? ['basic', 'standard', 'premium']
            : ['standard'];

          targets.forEach((pkg) => {
            if (!updated.packages[pkg].dynamic) updated.packages[pkg].dynamic = {};
            updated.packages[pkg].dynamic[newKey] = '';
          });

          return updated;
        });
      }}
      className="back-btn" 
    >
      + Add Field
    </button>

    <button className="back-btn" onClick={onBack}>
      Back
    </button>
  </div>

  <button className="submit-btn" type="submit">
    Next
  </button>
</div>


      </form>
    </div>
  );
};

export default ScopePricing;
