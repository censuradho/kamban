import { Icon } from '@/components'
import { appSettings } from '@/config/app'
import * as Styles from './styles'
import { ThemeSwitcherProps } from './types'

export function ThemeSwitcher (props: ThemeSwitcherProps) {

  const { onChange, defaultChecked, theme, checked } = props


  return (
    <Styles.Container>
      <Icon name="moon" color={theme === appSettings.theme.darkMode ? 'primary' : 'text'} />
      <Styles.SwitchRoot
        onCheckedChange={onChange}
        checked={checked}
      >
        <Styles.SwitchThumb />
      </Styles.SwitchRoot>
      <Icon name="sun"  color={theme === appSettings.theme.lightMode ? 'primary' : 'text'} />
    </Styles.Container>
  )
}