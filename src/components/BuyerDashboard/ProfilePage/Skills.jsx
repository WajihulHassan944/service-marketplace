import "./Styles.css";
export default function Skills() {
    const skills = ["JavaScript ES6 developer", "Website designer", "Ajax programmer", "HTML5 expert", "CSS3 expert"];
    return (
      <div className="skills-container">
  <div className="child-div">
    <h1 className="skills-heading">Skills</h1>
    <div className="skills-tags">
      {skills.map((skill, idx) => (
        <span className="skill-tag" key={idx}>{skill}</span>
      ))}
    </div>
  </div>
</div>

    );
  }