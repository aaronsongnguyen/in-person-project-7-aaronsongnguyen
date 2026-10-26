import { useState, useEffect } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Fetch skills from API (optional challenge)
  // For now, using hardcoded data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSkills([
        { id: 1, name: 'React', level: 90, category: 'Frontend' },
        { id: 2, name: 'JavaScript', level: 95, category: 'Frontend' },
        { id: 3, name: 'Node.js', level: 80, category: 'Backend' },
        { id: 4, name: 'Python', level: 75, category: 'Backend' },
        { id: 5, name: 'MongoDB', level: 70, category: 'Database' },
        { id: 6, name: 'PostgreSQL', level: 75, category: 'Database' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <section id="skills" className="skills">
        <div className="container">
          <h2>Skills</h2>
          <p>Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>My Skills</h2>
        <div className="skills-grid">
          {skills.map(skill => (
            <div key={skill.id} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="skill-category">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;