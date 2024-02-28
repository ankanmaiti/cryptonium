import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: JSX.Element;
  defaultTheme?: Theme;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "theme" }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, defaultTheme);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(theme);

    return () => {
      root.classList.remove(theme);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
