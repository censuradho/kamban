import { forwardRef } from 'react'
import * as Styles from './styles'
import { TextareaProps } from './types'

export const Textarea = forwardRef<any, TextareaProps>(
  (props, ref) => {
    const {
      label,
      errorMessage,
      ...otherProps
    } = props
    return (
      <Styles.Container>
        <Styles.Label htmlFor={otherProps?.id}>{label}</Styles.Label>
        <Styles.Textarea {...otherProps} ref={ref} />
        <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
      </Styles.Container>
    )
  }) 