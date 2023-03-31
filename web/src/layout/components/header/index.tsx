import { useTheme } from '@/context/theme'
import { ThemeSwitcher } from '../theme-switcher'
import * as Styles from './styles'
import { appSettings } from '@/config/app'

export function Header () {
  const { currentTheme, toggleTheme } = useTheme()

  const defaultChecked = currentTheme !== appSettings.theme.darkMode
  const checked = currentTheme === appSettings.theme.lightMode

  console.log(checked)
  return (
    <Styles.Container>
      <ThemeSwitcher
        checked={checked} 
        theme={currentTheme}
        onChange={toggleTheme}
        defaultChecked={defaultChecked}
      />
    </Styles.Container>
  )
}