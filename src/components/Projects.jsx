import { useState } from 'react';
// TODO: Import useProjects from context
import ProjectCard from './ProjectCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Projects = () => {
  // TODO: Get projects, loading, and error from context
  // const { projects, loading, error } = useProjects();

  const [filter, setFilter] = useState('all');

  // Temporary hardcoded data - remove when using context
  const projects = [];
  const loading = false;
  const error = null;

  // TODO: Handle loading state
  // if (loading) {
  //   return (
  //     <section id="projects" className="projects">
  //       <div className="container">
  //         <h2>Projects</h2>
  //         <LoadingSpinner />
  //       </div>
  //     </section>
  //   );
  // }

  // TODO: Handle error state
  // if (error) {
  //   return (
  //     <section id="projects" className="projects">
  //       <div className="container">
  //         <h2>Projects</h2>
  //         <ErrorMessage
  //           message={error}
  //           onRetry={() => window.location.reload()}
  //         />
  //       </div>
  //     </section>
  //   );
  // }

  // TODO: Filter projects based on selected category
  const filteredProjects = projects; // Replace with actual filtering logic

  const categories = ['all', 'web', 'mobile', 'data'];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>

        {/* Filter buttons */}
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

        {/* Projects grid */}
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