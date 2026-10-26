import { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState('all');

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2>Projects</h2>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2>Projects</h2>
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const categories = ['all', 'web', 'mobile', 'data'];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>

        <ProjectForm />

        <div className="project-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="no-projects">No projects found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
