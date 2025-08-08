import Image from 'next/image';
import './style.css';
import { FaTools, FaUserCog } from 'react-icons/fa';

export default function EnterpriseSuite() {
  return (
    <section className="enterpriseSection">
      <div className="contentWrapper">
        <div className="textBlock">
          <p className="subtitle">Enterprise Suite</p>
          <h1 className="heading">
            This is how <br />
            <span className="highlight">good companies</span> <br />
            <span className="highlight">find good company.</span>
          </h1>
          <p className="description">
            Access the top 1% of talent on Todo, and a full suite of hybrid workforce management tools.
            This is how innovation works now.
          </p>

          <ul className="featureList">
            <li><FaTools className="icon" /> Access expert talent to fill your skill gaps</li>
            <li><FaUserCog className="icon" /> Control your workflow: hire, classify and pay your talent</li>
          </ul>

          <button className="learnMore">Learn more</button>
        </div>

        <div className="imageBlock">
          <img
            src="/assets/homeThird/enterprise.png"
            alt="Man working from home in wheelchair"
            width={700}
            className="image"
          />
        </div>
      </div>
    </section>
  );
}
