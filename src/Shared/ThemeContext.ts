import { createContext } from 'react';

export type Theme = "DARK" | "LIGHT";
export type ThemeContextType = { theme: Theme, setTheme: (theme: Theme) => void };
export const ThemeContext = createContext<ThemeContextType>({ theme: "LIGHT", setTheme: (theme: Theme) => { } });