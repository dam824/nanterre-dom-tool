'use client'

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
    const [themeColor, setThemeColor]= useState('#f44336d4');

    useEffect(() =>{
        const saved = localStorage.getItem('themeColor');
        if(saved){
            setThemeColor(saved);
            document.documentElement.style.setProperty('--main-color', saved);
        }
    }, []);

    //save and apply
    useEffect(()=>{
        if(themeColor){
            localStorage.setItem('themeColor', themeColor);
            document.documentElement.style.setProperty('--main-color', themeColor);
        }
    }, [themeColor]);

    return(
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);