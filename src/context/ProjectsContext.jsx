import { createContext, useState, useContext, useEffect } from 'react';

const ProjectsContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  const addProject = async (projectData) => {
    const response = await fetch('http://localhost:3001/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projectData, id: Date.now() })
    });
    if (!response.ok) {
      throw new Error('Failed to add project');
    }
    const newProject = await response.json();
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const value = { projects, loading, error, addProject };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
