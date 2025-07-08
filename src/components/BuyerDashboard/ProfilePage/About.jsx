import "./Styles.css";
export default function About({description}) {
    return (
      <div className="about-container">
        <h3>About Me</h3>
        <p>
          {description}
        </p>
      </div>
    );
  }