import { PropsWithChildren } from 'react'
import * as Styles from './styles'
import { DropdownProps } from './types'

export function Dropdown (props: PropsWithChildren<DropdownProps>) {
  const { 
    children,
    ...otherProps
  } = props

  const renderOptions = otherProps.options.map((value, index) => (
    <Styles.Item key={index} onClick={value?.onClick}>
      {value.label}
    </Styles.Item>
  ))
  return (
    <Styles.Root>
      <Styles.Trigger asChild>
        {children}
      </Styles.Trigger>
      <Styles.Portal>
        <Styles.Content sideOffset={5}>
          {renderOptions}
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}