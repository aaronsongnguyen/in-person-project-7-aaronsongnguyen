import { createContext, useState, useContext, useEffect } from 'react';

// TODO: Create the ProjectsContext
const ProjectsContext = null; // Replace with createContext()

// Custom hook for using projects
export const useProjects = () => {
  // TODO: Implement similar to useTheme
  return {}; // TODO: Return the context
};

export const ProjectsProvider = ({ children }) => {
  // TODO: Create state for projects, loading, and error
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // TODO: Implement useEffect to fetch projects when component mounts
  // Remember to:
  // 1. Create an async function inside useEffect
  // 2. Handle loading states
  // 3. Handle errors with try/catch
  // 4. Implement cleanup to prevent race conditions
  // useEffect(() => {
  //   let isCancelled = false;
  //
  //   const fetchProjects = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //
  //       // TODO: Fetch from 'http://localhost:3001/projects'
  //       // Check if response is ok
  //       // Parse JSON
  //       // Update state only if not cancelled
  //     } catch (err) {
  //       // TODO: Handle error only if not cancelled
  //     }
  //   };
  //
  //   fetchProjects();
  //
  //   // Cleanup function
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, []);

  // TODO: Create addProject function
  // const addProject = async (projectData) => {
  //   try {
  //     // POST request to API
  //     // Update local state on success
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  // TODO: Create updateProject function
  // const updateProject = async (id, updates) => {
  //   // PUT request to API
  //   // Update local state
  // };

  // TODO: Create deleteProject function
  // const deleteProject = async (id) => {
  //   // DELETE request to API
  //   // Update local state
  // };

  // TODO: Create the value object
  const value = {
    // Add all state and functions here
  };

  // TODO: Return the Provider
  return (
    <div>{children}</div> // Replace with actual Provider
  );
};