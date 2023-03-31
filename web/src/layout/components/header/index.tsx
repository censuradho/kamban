import { useTheme } from '@/context/theme'
import { ThemeSwitcher } from '../theme-switcher'
import * as Styles from './styles'
import { appSettings } from '@/config/app'
import { paths } from '@/constants/routes'
import Image from 'next/image'
import Link from 'next/link'

export function Header () {
  const { currentTheme, toggleTheme } = useTheme()

  const defaultChecked = currentTheme !== appSettings.theme.darkMode
  const checked = currentTheme === appSettings.theme.lightMode

  return (
    <Styles.Container>
      <Link href={paths.home}>
        <Image src="/logo-sm.svg" alt="Logo" width={150} height={40} style={{ objectFit: 'contain' }} />
      </Link>
      <ThemeSwitcher
        checked={checked} 
        theme={currentTheme}
        onChange={toggleTheme}
        defaultChecked={defaultChecked}
      />
    </Styles.Container>
  )
}