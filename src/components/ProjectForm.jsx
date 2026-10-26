import { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';

const ProjectForm = () => {
  const { addProject } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    imageUrl: 'https://placehold.co/600x400?text=New+Project',
    technologies: []
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim() === '') {
      return;
    }
    try {
      setError(null);
      await addProject(formData);
      setFormData({
        title: '',
        description: '',
        category: 'web',
        imageUrl: 'https://placehold.co/600x400?text=New+Project',
        technologies: []
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Project title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Project description"
        value={formData.description}
        onChange={handleChange}
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="web">Web</option>
        <option value="mobile">Mobile</option>
        <option value="data">Data</option>
      </select>
      <button type="submit">Add Project</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};

export default ProjectForm;
