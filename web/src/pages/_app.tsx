import { BoardProvider } from '@/context/board'
import { KambanProvider } from '@/context/kamban'
import { ThemeProvider } from '@/context/theme'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { globalStyle } from 'stitches.config'


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    globalStyle()
  }, [])

  return (
    <ThemeProvider>
      <KambanProvider>
        <BoardProvider>
          <Component {...pageProps} />
        </BoardProvider>
      </KambanProvider>
    </ThemeProvider>
  )
}
