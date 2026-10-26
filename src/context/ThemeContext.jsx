import { createContext, useState, useContext, useEffect } from 'react';

// TODO: Create the ThemeContext using createContext()
const ThemeContext = null; // Replace with createContext()

// Custom hook for using theme
export const useTheme = () => {
  // TODO: Get context using useContext
  // TODO: Add error handling if context is not found
  // Hint: throw new Error('useTheme must be used within ThemeProvider')

  return {}; // TODO: Return the context
};

// Provider component
export const ThemeProvider = ({ children }) => {
  // TODO: Initialize theme state
  // Hint: Check localStorage first, default to 'light'
  // const [theme, setTheme] = useState(() => {
  //   return localStorage.getItem('theme') || 'light';
  // });

  // TODO: Create a useEffect to:
  // 1. Set data-theme on the <html> element: document.documentElement.setAttribute('data-theme', theme)
  // 2. Save theme to localStorage
  // This should run whenever theme changes
  // useEffect(() => {
  //   // Your code here
  // }, [theme]);

  // TODO: Create toggleTheme function
  // const toggleTheme = () => {
  //   // Switch between 'light' and 'dark'
  // };

  // TODO: Create the value object with theme and toggleTheme
  const value = {
    // Add theme and toggleTheme here
  };

  // TODO: Return the Provider with value and children
  return (
    <div>{children}</div> // Replace with actual Provider
  );
};