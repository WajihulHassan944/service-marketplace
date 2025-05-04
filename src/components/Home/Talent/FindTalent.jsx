import './FindTalent.css';
import Link from 'next/link';

export default function FindTalent() {
  return (
    <div className="main">
    <section className="find-talent-section">
      <div className="overlay">
        <div className="text-area">
          <p className="for-clients">For clients</p>
          <h1 className="main-heading">Find talent your way</h1>
<p className="subheading">
  Work with the largest network of independent<br />
  professionals and get things done—from quick<br />
  turnarounds to big transformations.
</p>


          <div className="card-container">
            <Link href="#" legacyBehavior>
              <a className="green-card">
                <h2>Post a job<br />and hire a pro</h2>
                <p>Talent Marketplace™ →</p>
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="green-card">
                <h2>Browse and<br />buy projects</h2>
                <p>Project Catalog™ →</p>
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="green-card">
                <h2>Get advice from an<br />industry expert</h2>
                <p>Consultations →</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
