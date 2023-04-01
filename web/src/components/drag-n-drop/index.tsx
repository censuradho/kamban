import { PropsWithChildren } from 'react'
import { DragNDropProps } from './types'

import styles from './styles.module.css'

export function DragNDrop (props: PropsWithChildren<DragNDropProps>) {
  const {
    children
  } = props

  return (
    <div
      className={styles.container} 
      draggable
    >{children}</div>
  )
}