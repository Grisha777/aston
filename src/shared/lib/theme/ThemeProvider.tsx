import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContent";
import type { Theme } from "./ThemeContent";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        document.documentElement.setAttribute('chosen-theme', theme);
    },[theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};
