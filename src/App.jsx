import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'


function App() {
  // Nothing to do here for the theme: ThemeProvider's effect sets data-theme on <html>,
  // so index.css's [data-theme="dark"] rules reach the Navbar and Footer too.

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App