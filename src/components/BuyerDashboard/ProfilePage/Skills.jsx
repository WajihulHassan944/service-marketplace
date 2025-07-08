import "./Styles.css";

export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null; // Optional: avoid rendering empty section

  return (
    <div className="skills-container">
      <div className="child-div">
        <h1 className="skills-heading">Skills</h1>
        <div className="skills-tags">
          {skills.map((skill, idx) => (
            <span className="skill-tag" key={idx}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
