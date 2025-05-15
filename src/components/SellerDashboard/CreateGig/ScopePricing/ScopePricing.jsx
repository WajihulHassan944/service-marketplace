'use client';

import { useState } from 'react';
import './scopepricing.css';

const ScopePricing = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    packages: {
      basic: {
        name: '', description: '', deliveryTime: '', 
        responsiveDesign: false, sourceCode: false, revisions: 0, pages: 1,
        contentUpload: false, paymentIntegration: false, socialIcons: false, price: ''
      },
      standard: {
        name: '', description: '', deliveryTime: '',
        responsiveDesign: false, sourceCode: false, revisions: 0, pages: 1,
        contentUpload: false, paymentIntegration: false, socialIcons: false, price: ''
      },
      premium: {
        name: '', description: '', deliveryTime: '', 
        responsiveDesign: false, sourceCode: false, revisions: 0, pages: 1,
        contentUpload: false, paymentIntegration: false, socialIcons: false, price: ''
      },
    },
    extras: {
      fastDelivery: false,
      additionalPage: false,
      sourceCode: false,
      designCustomization: false,
    },
  });

  const [charCount, setCharCount] = useState({ basic: 0, standard: 0, premium: 0 });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, pkg, key] = name.split('.');

    if (section === 'packages') {
      setFormData((prevState) => ({
        ...prevState,
        packages: {
          ...prevState.packages,
          [pkg]: {
            ...prevState.packages[pkg],
            [key]: type === 'checkbox' ? checked : value,
          },
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [pkg]: type === 'checkbox' ? checked : value,
        },
      }));
    }
  };

  const handleDescriptionChange = (pkg, e) => {
    const newDescription = e.target.innerText;
    const newCharCount = newDescription.length;
    setFormData((prevState) => ({
      ...prevState,
      packages: {
        ...prevState.packages,
        [pkg]: {
          ...prevState.packages[pkg],
          description: newDescription,
        },
      },
    }));
    setCharCount((prevState) => ({
      ...prevState,
      [pkg]: newCharCount,
    }));
  };

  const handleContinue = () => {
    // No navigation; static action
    console.log('Save & Continue clicked');
  };

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
                    name={`packages.${pkg}.name`}
                    value={formData.packages[pkg].name}
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
                  <input
                  className='descBox'
                    placeholder="Describe your offering"
                    onInput={(e) => handleDescriptionChange(pkg, e)}
                  />
                  <div className="char-count">{charCount[pkg]}/1200 Characters</div>
                </td>
              ))}
            </tr>

            {["price", "deliveryTime", "revisions", "pages"].map((field) => (
              <tr key={field}>
                <td>
                  {field === 'price' ? 'Price ($)' :
                   field === 'deliveryTime' ? 'Delivery Time (days)' :
                   field === 'revisions' ? 'Revisions' : 'Number of Pages'}
                </td>
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <td key={`${field}-${pkg}`}>
                    <input
                      type="number"
                      name={`packages.${pkg}.${field}`}
                      value={formData.packages[pkg][field]}
                      onChange={handleChange}
                      placeholder={field}
                      min="0"
                    />
                  </td>
                ))}
              </tr>
            ))}

            {["responsiveDesign", "contentUpload", "paymentIntegration", "socialIcons"].map((field) => (
              <tr key={field}>
                <td>{field.replace(/([A-Z])/g, ' $1')}</td>
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <td key={`${field}-${pkg}`}>
                    <input
                      type="checkbox"
                      name={`packages.${pkg}.${field}`}
                      checked={formData.packages[pkg][field]}
                      onChange={handleChange}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="extras">
        <h3>Add Extra Services</h3>
        <label>
          <input
            name="extras.fastDelivery"
            type="checkbox"
            checked={formData.extras.fastDelivery}
            onChange={handleChange}
          /> Extra Fast Delivery
        </label>
        <label>
          <input
            name="extras.additionalPage"
            type="checkbox"
            checked={formData.extras.additionalPage}
            onChange={handleChange}
          /> Additional Page
        </label>
        <label>
          <input
            name="extras.sourceCode"
            type="checkbox"
            checked={formData.extras.sourceCode}
            onChange={handleChange}
          /> Include Source Code
        </label>
        <label>
          <input
            name="extras.designCustomization"
            type="checkbox"
            checked={formData.extras.designCustomization}
            onChange={handleChange}
          /> Design Customization
        </label>
      </div>

      <div className="submit-container">
        <button className="back-btn" onClick={onBack}>Back</button>
        <button className="submit-btn" onClick={onNext}>Save & Continue</button>
      </div>
    </div>
  );
};

export default ScopePricing;
