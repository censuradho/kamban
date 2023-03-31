import { 
  createContext, 
  PropsWithChildren, 
  ReactNode, 
  useCallback, 
  useContext, 
  useEffect, 
  useMemo, 
  useState 
} from 'react'

import { light, dark } from '@/constants/theme'

import { globalStyle } from 'stitches.config'
import { useLocalStorage } from '@/hooks';
import { isBrowser } from '@/utils/helpers';

import { appSettings } from '@/config/app'

interface ThemeContextData {
  toggleTheme: () => void;
  theme: Pick<(typeof light), 'colors'>;
  currentTheme: string
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

export function ThemeProvider ({ children }: PropsWithChildren) {
  const _isBrowser = isBrowser()

  const {
    darkMode,
    lightMode,
    defaultMode
  } = appSettings.theme

  const getSystemPreferenceIsDarkTheme = useCallback(() => {
    return _isBrowser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [_isBrowser])

  const [themeStorage, setThemeStorage] = useLocalStorage(`${appSettings.appName}:${appSettings.theme.storageKey}`, '')
  const _isDarkThemePreferences = getSystemPreferenceIsDarkTheme()

  const mapTheme = useMemo(() => ({
    [darkMode]: dark,
    [lightMode]: light
  }), [darkMode, lightMode])

  const themePreference = 
    themeStorage
    || (_isDarkThemePreferences ? darkMode : lightMode)

  const [currentTheme, setCurrentTheme] = useState(themePreference)
  const [theme, setTheme] = useState(mapTheme[currentTheme as keyof typeof mapTheme])

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevState => prevState === lightMode ? darkMode : lightMode)
  }, [])

  const handleSavePreference = useCallback((currentTheme: string) => {
    setThemeStorage(currentTheme)
  }, [])

  useEffect(() => {
    document.body.classList.remove('theme-default', mapTheme[defaultMode])
    document.body.classList.remove('light-theme', mapTheme[defaultMode])
    document.body.classList.remove('dark-theme', mapTheme[defaultMode])

    document.body.classList.add(mapTheme[currentTheme as keyof typeof mapTheme])

    setTheme(mapTheme[currentTheme as keyof typeof mapTheme])
    handleSavePreference(currentTheme)
  }, [currentTheme, defaultMode, handleSavePreference, mapTheme])

  useEffect(() => {
    globalStyle()
  }, [])

  return (
    <ThemeContext.Provider value={{ 
      toggleTheme, 
      theme, 
      currentTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)