'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './InfoSettings.css';
import { FaUserCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '@/const';
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { toast } from 'react-hot-toast';
countries.registerLocale(enLocale);
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { logoutUser } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';
const countryOptions = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({
    value: code,
    label: name,
  })
);

const phoneCodeOptions = getCountries().map((countryCode) => ({
  value: `+${getCountryCallingCode(countryCode)}`,
  label: `+${getCountryCallingCode(countryCode)} (${countryCode})`,
}));
const InfoSettings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    linkedUrl: '',
    speciality: '',
    description: '',
    skills: [],
    languages: [],
    profileImg: null,
    phoneCountryCode: '',   // ✅ NEW
  phoneNumber: '',        // ✅ NEW
  });
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
const [newSkill, setNewSkill] = useState('');
const [newLanguage, setNewLanguage] = useState('');

const handleAddSkill = () => {
  if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill('');
  }
};

const handleRemoveSkill = (skillToRemove) => {
  setFormData((prev) => ({
    ...prev,
    skills: prev.skills.filter((skill) => skill !== skillToRemove),
  }));
};
  useEffect(() => {
    if (user) {
      setFormData({
        userId: user._id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        country: user.country || '',
        linkedUrl: user.sellerDetails?.linkedUrl || '',
        speciality: user.sellerDetails?.speciality || '',
        profileImg: null,
        description: user.sellerDetails?.description || '',
        skills: user.sellerDetails?.skills || [],
        languages: user.sellerDetails?.languages || [],
        phoneCountryCode: user.phone?.countryCode || '',   // ✅ NEW
  phoneNumber: user.phone?.number || '',             // ✅ NEW
      });
      setPreviewImg(user.profileUrl || null);
    }
  }, [user]);
const handleAddLanguage = () => {
  if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLanguage.trim()],
    }));
    setNewLanguage('');
  }
};

const handleRemoveLanguage = (languageToRemove) => {
  setFormData((prev) => ({
    ...prev,
    languages: prev.languages.filter((lang) => lang !== languageToRemove),
  }));
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImg: file }));
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
if (formData.phoneCountryCode || formData.phoneNumber) {
  if (!formData.phoneCountryCode) {
    toast.error("Please select a country code.");
    setLoading(false);
    return;
  }

  const fullNumber = `${formData.phoneCountryCode}${formData.phoneNumber}`;
  const phoneNumber = parsePhoneNumberFromString(fullNumber);

  if (!phoneNumber || !phoneNumber.isValid()) {
    toast.error("Please enter a valid phone number.");
    setLoading(false);
    return;
  }
}
  
    try {
      const form = new FormData();
      form.append('userId', formData.userId);
      if (formData.firstName) form.append('firstName', formData.firstName);
      if (formData.lastName) form.append('lastName', formData.lastName);
      if (formData.email) form.append('email', formData.email);
      if (formData.country) form.append('country', formData.country);
      if (formData.linkedUrl) form.append('linkedUrl', formData.linkedUrl);
      if (formData.speciality) form.append('speciality', formData.speciality);
      if (formData.profileImg) form.append('profileImg', formData.profileImg);
if (formData.description) form.append('description', formData.description);

if (formData.phoneCountryCode) form.append("phoneCountryCode", formData.phoneCountryCode);
if (formData.phoneNumber) form.append("phoneNumber", formData.phoneNumber);

if (formData.skills.length) form.append('skills', JSON.stringify(formData.skills));
if (formData.languages.length) {
  form.append('languages', JSON.stringify(formData.languages)); // ✅ added
}

      const res = await fetch(`${baseUrl}/users/update-profile`, {
        method: 'PUT',
        body: form,
         credentials: 'include',
      });

      const data = await res.json();
    if ([440, 401].includes(res.status)) {
  dispatch(logoutUser());
  toast.error(
    res.status === 440
      ? 'You have been logged out due to inactivity.'
      : 'Please log in to continue.'
  );
  router.push('/login');
  return; // ⛔ stop here
}


      if (!res.ok) throw new Error(data.message || 'Update failed.');
      setLoading(false);
toast.success("Profile updated successfully.")
        await refreshAndDispatchUser(dispatch);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent-container">
      <Sidebar />
      <form className="account-containers" onSubmit={handleSubmit}>
        <h2>My Info</h2>

        <div className="flexed-div">
          <div className="form-group">
            <label>First Name <span>*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label>Last Name <span>*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
          </div>
        </div>

 <div className="flexed-div">
   <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              disabled
            />
          </div>
        <div className="form-group">
          <label>Country</label>
         <Select
  options={countryOptions}
  value={countryOptions.find((opt) => opt.label === formData.country)}
  onChange={(selected) =>
    setFormData((prev) => ({ ...prev, country: selected?.label || "" }))
  }
  placeholder="Select your country"
  className="country-select"
  classNamePrefix="select"
/>

        </div>

</div>
     
<div className="flexed-div">
  <div className="form-group">
    <label>Phone Country Code</label>
    <Select
      options={phoneCodeOptions}
      value={phoneCodeOptions.find(
        (opt) => opt.value === formData.phoneCountryCode
      )}
      onChange={(selected) =>
        setFormData((prev) => ({
          ...prev,
          phoneCountryCode: selected?.value || "",
        }))
      }
      placeholder="Select code"
      className="country-select"
      classNamePrefix="select"
    />
  </div>

  <div className="form-group">
    <label>Phone Number</label>
    <input
      type="text"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleInputChange}
      placeholder="3001234567"
    />
  </div>
</div>


       
       {user.currentDashboard === "seller" && (
        <>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input
            type="text"
            name="linkedUrl"
            value={formData.linkedUrl}
            onChange={handleInputChange}
            placeholder="e.g. linkedin.com/in/your-profile"
          />
        </div>

        <div className="form-group">
          <label>Speciality</label>
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleInputChange}
            placeholder="e.g. Fullstack Web Development"
          />
        </div>
<div className="form-group">
  <label>Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    placeholder="Write something about yourself..."
    className='textarea-info'
  ></textarea>
</div>








<div className="form-group">
  <label>Languages</label>
  <div className="skills-input-row">
    <input
      type="text"
      value={newLanguage}
      onChange={(e) => setNewLanguage(e.target.value)}
      placeholder="Add a language and press Enter"
      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
    />
    <button type="button" className="change-email-btn" onClick={handleAddLanguage}>
      Add
    </button>
  </div>
  <div className="skills-list">
    {formData.languages.map((language, idx) => (
      <span key={idx} className="skill-tag">
        {language}
        <button type="button" onClick={() => handleRemoveLanguage(language)}>✕</button>
      </span>
    ))}
  </div>
</div>

<div className="form-group">
  <label>Skills</label>
  <div className="skills-input-row">
    <input
      type="text"
      value={newSkill}
      onChange={(e) => setNewSkill(e.target.value)}
      placeholder="Add a skill and press Enter"
      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
    />
    <button type="button" className="change-email-btn" onClick={handleAddSkill}>
      Add
    </button>
  </div>
  <div className="skills-list">
    {formData.skills.map((skill, idx) => (
      <span key={idx} className="skill-tag">
        {skill}
        <button type="button" onClick={() => handleRemoveSkill(skill)}>✕</button>
      </span>
    ))}
  </div>
</div>
</>
)}




        <div className="form-group profile-photo">
          <label>Profile Photo</label>
          <div className="profile-pic">
            {previewImg ? (
              <Image src={previewImg} alt="Profile" width={50} height={50} className="avatar" style={{objectFit:"contain"}} />
            ) : (
              <FaUserCircle size={50} color="#888" />
            )}
            <label className="edit-btn">
              Edit
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </label>
          </div>
          <small>(jpg or png format)</small>
        </div>

      

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
     
      </form>
    </div>
  );
};

export default InfoSettings;
