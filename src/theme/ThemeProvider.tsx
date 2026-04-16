import React, { createContext, useContext, useEffect, useMemo } from "react";

export type Theme = "light" | "dark" | "light-ec" | "dark-ec";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "light" });

export interface ThemeProviderProps {
  theme?: Theme;
  /** Target element to apply the theme attribute to. Defaults to document.body. */
  targetRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme = "light",
  targetRef,
  children,
}: ThemeProviderProps) {
  useEffect(() => {
    const el = targetRef?.current ?? document.body;
    el.setAttribute("data-theme", theme);
    return () => {
      el.removeAttribute("data-theme");
    };
  }, [theme, targetRef]);

  const value = useMemo(() => ({ theme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext).theme;
}
