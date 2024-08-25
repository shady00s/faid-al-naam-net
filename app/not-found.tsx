'use client';
import React, { useState, useEffect } from 'react';

export default function NotFound() {
      
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));
      setIsDarkMode(mediaQuery.matches);
    }, []);
  
    return (
      <div id="main" className={isDarkMode ? 'dark-mode' : ''}>
        <div className="fof">
          <h1>Error 404</h1>
        </div>
      </div>
    );

}