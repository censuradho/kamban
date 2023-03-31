import { Icon } from '@/components'
import { appSettings } from '@/config/app'
import { useTheme } from '@/context/theme'
import * as Styles from './styles'

export function ThemeSwitcher () {
  
  const { toggleTheme, currentTheme } = useTheme()

  return (
    <Styles.Container>
      <Icon name="moon" color={currentTheme === appSettings.theme.darkMode ? 'primary' : 'text'} />
      <Styles.SwitchRoot
        checked={currentTheme === appSettings.theme.lightMode} 
        onCheckedChange={toggleTheme}
      >
        <Styles.SwitchThumb />
      </Styles.SwitchRoot>
      <Icon name="sun"  color={currentTheme === appSettings.theme.lightMode ? 'primary' : 'text'} />
    </Styles.Container>
  )
}