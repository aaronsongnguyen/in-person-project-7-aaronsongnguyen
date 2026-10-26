import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { ProjectsProvider } from './context/ProjectsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
