import { useEffect, useRef, useState } from 'react'
import * as Styles from './styles'
import { KambanNameFormProps } from './types'

export function KambanNameForm (props: KambanNameFormProps) {
  
  const { 
    title,
    onBlur
  } = props

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(title || '')
  }, [title])

  return (
    <Styles.Input 
      type="text" 
      value={value}
      style={{ width: Math.min(Math.max(value.length, 2), 50) + 'ch' }}
      onChange={event => setValue(event.target.value)}
      onBlur={() => onBlur?.(value)}
    />
  )
}