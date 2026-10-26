import { useState } from 'react';
// TODO: Import useTheme from context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: Get theme and toggleTheme from context

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>John Doe</h1>
            <span>Full Stack Developer</span>
          </div>

          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="navbar-actions">
            {/* TODO: Add theme toggle button */}
            {/* Button should show sun icon for light mode, moon for dark */}
            {/* onClick should call toggleTheme */}
            <button className="theme-toggle">
              🌞
            </button>

            <button
              className="menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;