'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(null); // Pas de couleur au démarrage
  const [isReady, setIsReady] = useState(false); // On attend le chargement

   
  useEffect(() => {
    const saved = localStorage.getItem('themeColor') || '#f44336d4';
    setThemeColor(saved);
    document.documentElement.style.setProperty('--main-color', saved);
    setIsReady(true);
  }, []);

 
  useEffect(() => {
    if (themeColor) {
      localStorage.setItem('themeColor', themeColor);
      document.documentElement.style.setProperty('--main-color', themeColor);
    }
  }, [themeColor]);

  
  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
