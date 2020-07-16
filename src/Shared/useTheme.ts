import { useContext } from "react";
import { ThemeContext } from './ThemeContext';

export default function useTheme(): string {
    const { theme } = useContext(ThemeContext);

    return theme === "DARK" ? "Dark" : "";
}