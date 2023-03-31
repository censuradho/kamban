import { Box, Typography } from '@/components'
import { useBoard } from '@/context/board'
import { useBoolean } from '@/hooks'
import { useState } from 'react'
import { Header, TaskCard, TaskInfoDialog } from './components'
import * as Styles from './styles'
import { CurrentTask } from './types'

export function BoardLayout () {
  const { 
    currentBoard,
    editBoard
  } = useBoard()

  const [isOpenTaskInfoModal, toggleIsOpenTaskInfoModal] = useBoolean(false)
  const [task, setTask] = useState<CurrentTask | null>(null)

  const renderColumns = currentBoard?.columns?.map((column, index) => {
    const renderTasks = column.tasks?.map((task, index) => (
      <TaskCard
        key={task.id}
        data={task}
        onClick={() => {
          setTask(({
            ...task,
            columnId: column.id
          }))
          toggleIsOpenTaskInfoModal()
        }}
      />
    ))

    return (
      <li key={index}>
        <Styles.Column>
          <Typography>{`${column.name} (${column.tasks?.length || 0})`}</Typography>
          <Box 
            marginTop={2} 
            gap={1.625} 
            flexDirection="column"
          >
            {renderTasks}
          </Box>
        </Styles.Column>
      </li>
    )
  })


  return (
    <Styles.Container>
      <Header />
      {task && (
        <TaskInfoDialog
          columnId={task?.columnId}
          data={task}
          open={isOpenTaskInfoModal}
          onOpenChange={toggleIsOpenTaskInfoModal}
        />
      )}
      <Styles.ColumnList>
        <ul style={{ gridTemplateColumns: `repeat(${(renderColumns?.length || 0) + 1}, 280px)`}}>
          {renderColumns}
          <li>
            <Styles.NewColumnButton onClick={editBoard}>+ Add New Column</Styles.NewColumnButton>
          </li>
        </ul>
      </Styles.ColumnList>
    </Styles.Container>
  )
}