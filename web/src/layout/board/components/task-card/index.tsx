import { Typography } from '@/components'
import * as Styles from './styles'
import { TaskCardProps } from './types'

export function TaskCard (props: TaskCardProps) {
  const { 
    data,
    onClick 
  } = props

  return (
    <Styles.Container onClick={onClick}>
      <Styles.Name>{data.name}</Styles.Name>
      <Styles.Description>{data?.description}</Styles.Description>
    </Styles.Container>
  )
}