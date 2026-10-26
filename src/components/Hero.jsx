const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">John Doe</span>
          </h1>
          <p className="hero-subtitle">
            Full Stack Developer passionate about building amazing web experiences
          </p>
          <p className="hero-description">
            I specialize in React, Node.js, and modern web technologies.
            Currently focused on building scalable applications and exploring
            machine learning integrations.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;