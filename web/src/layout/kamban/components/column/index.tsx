import { Box, ButtonIcon, Dropdown, Icon, Typography } from '@/components'
import { useDrop } from '@/hooks'
import { columnService } from '@/services/api/kamban/column'
import { PropsWithChildren } from 'react'
import * as Styles from './styles'
import { ColumnProps } from './types'

export function Column (props: PropsWithChildren<ColumnProps>) {
  const {
    data,
    taskAmount,
    children,
    onMoveTaskCrossColumn,
    onDelete,
    onEdit,
    onClickToAddTask
  } = props
  
  const [{
    isOver,
  }, ref] = useDrop<{ columnId: string, taskId: string }>({
    onDrop: async payload => {
      if (payload.columnId === data.id) return;

      await columnService.moveTask(payload.columnId, payload.taskId, data.id)
      onMoveTaskCrossColumn?.()
    }
  })



  return (
    <Styles.Container ref={ref}>
      <Styles.Header>
        <Box justifyContent="space-between" alignItems="center">
          <Typography 
            color="heading"
            fontWeight="600"
          >
            {`${data.name} (${taskAmount})`}
          </Typography>
          <Dropdown
            options={[
              {
                label: (
                  <Box gap={1} alignItems="center">
                    <Icon name="edit"  size={15} color="heading" />
                    <Typography color="heading">Edit column</Typography>
                  </Box>
                ),
                onClick: onEdit
              },
              {
                label: (
                  <Box gap={1} alignItems="center">
                    <Icon name="trash" color="error" size={15} />
                    <Typography color="error">Delete column</Typography>
                  </Box>
                ),
                onClick: onDelete
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
        </Box>
      </Styles.Header>
      <Styles.Body>
        {children}
      </Styles.Body>
      <Styles.Footer>
        <Styles.AddTaskButton 
          onClick={onClickToAddTask}
          // onClick={() => {
          //   toggleIsOpenTaskForm()
          //   setColumnToRelateTask(column.id)
          // }}
        >+ Add item</Styles.AddTaskButton>
      </Styles.Footer>
    </Styles.Container>
  )
}