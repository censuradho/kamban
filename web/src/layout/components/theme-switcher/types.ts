export interface ThemeSwitcherProps {
  theme?: string
  onChange: () => void
  defaultChecked?: boolean
  checked?: boolean
}