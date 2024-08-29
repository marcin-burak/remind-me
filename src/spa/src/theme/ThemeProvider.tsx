import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { FluentProvider, Theme as FluentTheme, webDarkTheme, webLightTheme } from "@fluentui/react-components";

const localStorageThemeKey = "theme";

const darkThemeMediaKey = "(prefers-color-scheme: dark)";
const darkThemeMediaChangedEvent = "change";

enum Theme {
    system = "system",
    light = "light",
    dark = "dark"
};

interface ThemeContext {
    isLightTheme: boolean;
    setLightTheme: () => void;

    isDarkTheme: boolean;
    setDarkTheme: () => void;

    isSystemTheme: boolean;
    setSystemTheme: () => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<Theme>(() => {
        const themeFromLocalStorage = window.localStorage.getItem(localStorageThemeKey);
        if (themeFromLocalStorage) {
            return themeFromLocalStorage as Theme;
        }

        return Theme.system;
    });

    useEffect(() => {

        const onSystemThemeChanged = (event: MediaQueryListEvent) => {
            if (theme !== Theme.system) {
                return;
            }
            
            if (event.matches) {
                setTheme(Theme.dark);
                return;
            }

            setTheme(Theme.light);
        };

        window.matchMedia(darkThemeMediaKey).addEventListener(darkThemeMediaChangedEvent, onSystemThemeChanged);

        return () => window.matchMedia(darkThemeMediaKey).removeEventListener(darkThemeMediaChangedEvent, onSystemThemeChanged);
    }, []);

    let themeObject: FluentTheme;
    switch (theme) {
        case Theme.dark:
            themeObject = webDarkTheme;
            break;

        case Theme.light:
            themeObject = webLightTheme;
            break;

        default:
            const userPrefersDarkTheme = window.matchMedia(darkThemeMediaKey).matches;
            if (userPrefersDarkTheme) {
                themeObject = webDarkTheme;
                break;
            }
            themeObject = webLightTheme;
            break;
    }

    return (
        <FluentProvider theme={themeObject}>
            <ThemeContext.Provider value={{ 
                isLightTheme: theme === Theme.light,
                setLightTheme: () => { setTheme(Theme.light); window.localStorage.setItem(localStorageThemeKey, Theme.light); },
                isDarkTheme: theme === Theme.dark,
                setDarkTheme: () => { setTheme(Theme.dark); window.localStorage.setItem(localStorageThemeKey, Theme.dark); },
                isSystemTheme: theme === Theme.system,
                setSystemTheme: () => { setTheme(Theme.system); window.localStorage.setItem(localStorageThemeKey, Theme.system); }
            }}>
                {children}
            </ThemeContext.Provider>
        </FluentProvider>
    );
};