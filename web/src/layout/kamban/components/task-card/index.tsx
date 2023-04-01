import { Box, ButtonIcon, Dropdown, Icon, Typography } from '@/components'
import * as Styles from './styles'
import { TaskCardProps } from './types'
import { useDrag } from '@/hooks/useDrag'

export function TaskCard (props: TaskCardProps) {
  const {
    data,
    columnId
  } = props

  const [{
    isDragging
  }, ref] = useDrag({
    name: data.id,
    payload: {
      columnId,
      taskId: data.id
    }
  })


  
  return (
    <Styles.Container ref={ref} isDragging={isDragging}>
      <Box flexDirection="column" gap={0.5}>
        <Typography as="strong" size="sm" color="text" fontWeight="600">{data.name}</Typography>
        <Typography as="p" size="xsm" color="text">{data.description}</Typography>
      </Box>
      <Dropdown
        options={[
          {
            label: (
              <Box gap={1} alignItems="center">
                <Icon name="edit"  size={15} color="heading" />
                <Typography color="heading">Edit Task</Typography>
              </Box>
            ),
            onClick: () => {
              // setTaskToEdit(task)
              // toggleIsOpenTaskForm()
            }
          },
          {
            label: (
              <Box gap={1} alignItems="center">
                <Icon name="trash" color="error" size={15} />
                <Typography color="error">Delete Task</Typography>
              </Box>
            ),
            // onClick: () => setTaskToDelete(task)
          },
        ]}
      >
        <ButtonIcon
          label="menu"
          icon={{
            name: 'verticalDots'
          }}
        />
      </Dropdown>
    </Styles.Container>
  )
}