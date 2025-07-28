import Link from 'next/link';
import './styles.css';  
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer shadow-card">
      <div className="container">
        {/* Hire Talent */}
        <div className="column">
          <h4 className="heading">Hire Talent</h4>
          <ul>
            <li className="A-items">Hire Freelance Developers</li>
            <li className="A-items">Hire Freelance Designers</li>
            <li className="A-items">Hire Freelance Marketers</li>
            <li className="A-items">Hire Freelance Product Managers</li>
            <li className="A-items">Hire Freelance Project Managers</li>
            <li className="A-items">Hire Freelance Management Consultants</li>
          </ul>
        </div>

        {/* Featured Skills */}
        <div className="column">
          <h4 className="heading">Featured Skills</h4>
          <div className="skillsGrid">
            {[
              'Software Developers', 'Web Developers', 'Mobile App Developers', 'AI Engineers',
              'Full-stack Developers', 'UI/UX Designers', 'Graphic Designers', 'SEO Experts', 'Content Creators', 'Project Managers',
            ].map((skill, i) => <p key={i}>{skill}</p>)}
          </div>
        </div>

        {/* About */}
        <div className="column">
          <h4 className="heading">About</h4>
          <ul>
  <li className="A-items">
    <Link href="/contact">Contact Us</Link>
  </li>
  <li className="A-items">
    <Link href="/about">About Us</Link>
  </li>
  <li className="A-items">
    <Link href="/services">Services</Link>
  </li>
  <li className="A-items">
    <Link href="/">Top Talent</Link>
  </li>
</ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottomBar">
        <div className="logoSection">
          <img src="/assets/logo.png" alt="Toptal Logo" className="footer-logo" />
          <span>The World’s Top Talent, On Demand®</span>
        </div>
        <div className="socialIcons">
          <a href="#" className="social-icon"><FaLinkedin /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaFacebook /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
        </div>
      </div>

      <div className="legal">
        Copyright 2025 Market Place Service | Privacy Policy | Website Terms
      </div>
    </footer>
  );
}
