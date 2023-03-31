import { forwardRef } from 'react'

import { Icon } from '@/components'

import * as Styles from './styles'

import { ButtonProps } from './types'

export const Button = (props: ButtonProps) => {
  const { children, icon, loading, disabled, type,  ...otherProps } =
    props


  return (
    <Styles.Button
      type={type}
      disabled={disabled || loading}
      {...otherProps}
    >
      {icon && <Icon {...icon} />}
      <span>{children}</span>
    </Styles.Button>
  )
}