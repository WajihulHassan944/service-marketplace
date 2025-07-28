import Image from "next/image";
import "./Styles.css";

const AboutUs = () => {
  return (
    <div className="about-container">
     <section className="about-header">
  <h2>About Us</h2>
  <p>The world’s work marketplace</p>
</section>

<section className="profile-section">
  <div className="profile-img-wrapper">
    <Image
      src="/zack.jpeg"
      alt="Zack Lam"
      width={85}
      height={85}
      className="profile-img"
    />
  </div>
  <div className="second-div">
    <h3>Zack Lam</h3>
    <p className="title">President & CEO</p>
  </div>
</section>

<section className="body-text">
  <p>doTask began over two decades ago by pioneering a better way of working—helping businesses find more flexibility and connecting talent with greater opportunities.</p>
</section>

<section className="mission-section">
  <p className="mission-highlight">
    Our mission to create economic opportunities so people can live better lives has taken us further than we imagined. As a result, we’ve become the world’s work marketplace, where every day, businesses of all sizes and independent talent from around the globe come together to accomplish incredible things.
  </p>
</section>

<section className="body-text">
  <p>
    Like so many of you, doTask has had a profound impact on my life. I first joined this company on the product team, and over the years, I’ve come to understand what truly makes this platform work: the relationships. We see firsthand the passion and commitment that every client and freelancer brings to their work.
  </p>
  <p>
    Whether it’s a quick corporate presentation or a multi-year development project, both freelancers and clients on doTask consistently deliver outstanding results—because they love what they do.
  </p>
  <p>
    This is work that moves companies forward. Our work marketplace empowers customers with the flexibility to scale quickly and access the skills they need, even as their needs evolve. Success comes from collaboration. Clients get impactful work done, and freelancers grow their businesses.
  </p>
</section>

<section className="talent-section">
  <p><strong>doTask is your workforce.</strong></p>
  <p>
    If you’re a client, we’re here to get things done. This workforce of independent talent is ready for you. Whether you need one expert or a full team, we make it easier to connect with freelancers who can help you achieve your goals. You can build amazing things and become part of someone’s dream at the same time.
  </p>
  <p>
    We value impact over activity. Everything we do is focused on helping you build meaningful connections that turn ambition into achievement—creating your own Virtual Talent Bench of trusted professionals.
  </p>
  <p>
    That’s what we do. We connect potential—within every big and small dream—from across the globe.
  </p>
</section>

<section className="closing-section">
  <p>
    I can’t wait to see what you accomplish—the bold idea, the perfect team, the right freelancer, the next big project, or your mission to create economic opportunity for people around the world.
  </p>
  <p>We’re excited to support your journey. That’s why we’re here.</p>
  <p className="signature">— Zack Lam,<br />President and CEO</p>
</section>


      <section className="cta-section">
        <h3>Start your journey</h3>
        <div className="cta-buttons">
          <button className="btn">Find Talent</button>
          <button className="btn">Find Work</button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
