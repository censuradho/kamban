export type DarkMode = 'dark' | 'light'
export const lightMode: DarkMode = 'light'
export const darkMode: DarkMode = 'dark'
export const defaultMode: DarkMode = lightMode

export const appSettings = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || '@generic-name',
  siteUrl: process.env.SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || process.env.URL || 'http://localhost:3000',
  backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
  analytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  theme: {
    lightMode: 'light',
    darkMode: 'dark',
    defaultMode: 'light',
    storageKey: 'theme'
  }
} 
