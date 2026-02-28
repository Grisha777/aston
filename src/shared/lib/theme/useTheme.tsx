import { useContext } from "react";
import { ThemeContext } from './ThemeContent'

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('error')
    }

    return context
}