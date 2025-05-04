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
            src="/assets/users/one.png"

            alt="Hayden Brown"
            width={85}
            height={85}
            className="profile-img"
          />
        </div>
        <div className="second-div">
        <h3>Hayden Brown</h3>
        <p className="title">President & CEO</p>
        </div>
      </section>
      <section className="body-text">
      <p>Upwork began over two decades ago by pioneering a better way of working, helping businesses find more flexibility and connecting talent with more opportunities.</p>
      </section>

      <section className="mission-section">
        <p className="mission-highlight">
          Our mission to create economic opportunities so people have better lives has taken us so much further. As a result, we’ve become the world’s work marketplace where every day businesses of all sizes and independent talent from around the globe meet here to accomplish incredible things.
        </p>
      </section>

      <section className="body-text">
        <p>
          Like so many of you, Upwork has had a big impact on my life. I first came to this company on the product
          team and over the years have understood what makes this platform truly work: the relationships. We serve
          and personally see the passion and commitment that every client and every talent puts into their work.
        </p>
        <p>
          Whether it’s a quick corporate presentation or a multi-year development project – both talent on Upwork and
          clients are consistently doing really good work because they love what they do.
        </p>
        <p>
          It’s work that moves companies forward. Our work marketplace empowers our customers with the flexibility
          to scale quickly, find skills that continue as better and evolve as your needs go in a new direction. You
          find success in each other. You choose your business, and clients get the work done that matters.
        </p>
      </section>

      <section className="talent-section">
        <p><strong>Upwork is your workforce.</strong></p>
        <p>
          If you are a client, we’re down here to get things done, as this workforce of independent talent is ready
          for you. Whether you need one person or a full team, we make it easier to connect with freelancers to
          realize your mission. You can build amazing things and the instruments and part of someone’s dream.
        </p>
        <p>
          We value impact over activity. We do all in an effort to help you make the connections that will turn
          ambition into achievement, building your Virtual Talent Bench of trusted people.
        </p>
        <p>
          That’s what we do. We connect the potential, in every big and small dream, from across the globe.
        </p>
      </section>

      <section className="closing-section">
        <p>
          I can’t wait to see what you do – the new idea, the team that serves you best, the talent and the job – the
          client’s next million or mission to create economic opportunity for our people around the world.
        </p>
        <p>We can’t wait to see what you do. That’s why we’re here.</p>
        <p className="signature">— Hayden Brown,<br />President and CEO</p>
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
