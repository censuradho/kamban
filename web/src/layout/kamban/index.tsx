import { Box, ButtonIcon, DialogAlert, Dropdown, Icon, Typography } from '@/components'
import { useKamban } from '@/context/kamban'
import { useBoolean } from '@/hooks'
import { taskService } from '@/services/api/kamban/task'
import { Task, UpdateTask } from '@/services/api/kamban/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Column, KambanNameForm, TaskCard, TaskForm } from './components'
import * as Styles from './styles'
import { ColumnForm } from './components/column-form'
import { columnService } from '@/services/api/kamban/column'
import { Column as IColumn } from '@/context/board/types'
import { kambanService } from '@/services/api/kamban'
import { paths } from '@/constants/routes'

export function KambanLayout () {
  const { findKambanById, kamban } = useKamban()

  const [isOpenTaskForm, toggleIsOpenTaskForm] = useBoolean(false)
  const [isLoading, toggleIsLoading] = useBoolean(false)
  const [isOpenColumnForm, toggleIsOpenColumnForm] = useBoolean()
  const [isOpenDeleteBoardModal, toggleIsOpenDeleteBoardModal] = useBoolean()

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [columnToDelete, setColumnToDelete] = useState<IColumn | null>(null)

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [columnToEdit, setColumnToEdit] = useState<IColumn | null>(null)

  const [columnToRelateTask, setColumnToRelateTask] = useState('')

  const router = useRouter()

  const { id } = router.query

  const handleDeleteTask = async (taskId: string) => {
    try {
      toggleIsLoading()

      await taskService.delete(taskId)

      if (id) {
        await findKambanById(id as string)
      }

      setTaskToDelete(null)
    } finally {
      toggleIsLoading()
    }
  }

  const handleDeleteColumn = async (columnId: string) => {
    try {
      toggleIsLoading()

      await columnService.delete(columnId)

      if (id) {
        await findKambanById(id as string)
      }

      setColumnToDelete(null)
    } finally {
      toggleIsLoading()
    }
  }

  const handleDeleteBoard = async (id: string) => {
    try {
      toggleIsLoading()

      await kambanService.delete(id)
      router.push(paths.home)
    } finally {
      toggleIsLoading()
    }
  }

  const handleCloseTaskForm = () => {
    toggleIsOpenTaskForm()
    setTaskToEdit(null)
  }

  const handleCloseColumnForm = () => {
    toggleIsOpenColumnForm()
    setColumnToEdit(null)
  }

  const handleFindKambanById = async (id: string) => {
    try {
      toggleIsLoading()

      await findKambanById(id)
    } finally {
      toggleIsLoading()
    }
  }

  useEffect(() => {
    if (!id) return;

    findKambanById(id as string)
  }, [id])

  const renderColumn = kamban?.columns?.map(column => {

    const renderTasks = column?.tasks?.map(task => (
      <li key={task.id}>
        <TaskCard 
          data={task}
          columnId={column.id}
          onEdit={() => {
            setTaskToEdit(task)
            toggleIsOpenTaskForm()
          }}
          onDelete={() => setTaskToDelete(task)}
        />
      </li>
    ))

    return (
      <Column
        taskAmount={renderTasks?.length || 0}
        key={column.id}
        data={column}
        onMoveTaskCrossColumn={() => findKambanById(id as string)}
        onEdit={() => {
          setColumnToEdit(column)
          toggleIsOpenColumnForm()
        }}
        onDelete={() => {
          setColumnToDelete(column)
        }}
      >{renderTasks}</Column>
    )
  })

  return (
    <>
      {isOpenTaskForm && (
        <TaskForm 
          open={isOpenTaskForm}
          onOpenChange={handleCloseTaskForm}
          columns={kamban?.columns}
          taskToEdit={taskToEdit}
          columnId={columnToRelateTask}
          onSubmit={() => {
            id && findKambanById(id as string)
            handleCloseTaskForm()
          }}
        />
      )}
      {isOpenColumnForm && (
        <ColumnForm
          kambanId={id as string}
          onSubmit={() => handleFindKambanById(id as string)}
          loading={isLoading}
          open={isOpenColumnForm}
          onOpenChange={handleCloseColumnForm}
          data={columnToEdit}
        />
      )}
      <DialogAlert
        title="Delete this task?"
        description={`Are you sure you want to delete the ${taskToDelete?.name} task and its subtasks? This action cannot be reversed.`}
        open={!!taskToDelete}
        loading={isLoading}
        onOpenChange={() => setTaskToDelete(null)}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={() => taskToDelete && handleDeleteTask(taskToDelete?.id)}
      />
      <DialogAlert
        title="Delete this column?"
        description={`Are you sure you want to delete the ${columnToDelete?.name} column and its subtasks? This action cannot be reversed.`}
        open={!!columnToDelete}
        loading={isLoading}
        onOpenChange={() => setColumnToDelete(null)}
        onCancel={() => setColumnToDelete(null)}
        onConfirm={() => columnToDelete && handleDeleteColumn(columnToDelete?.id)}
      />
      <DialogAlert
        title="Delete this board?"
        description={`Are you sure you want to delete the ${kamban?.name} board and its sub columns? This action cannot be reversed.`}
        open={isOpenDeleteBoardModal}
        loading={isLoading}
        onOpenChange={toggleIsOpenDeleteBoardModal}
        onCancel={toggleIsOpenDeleteBoardModal}
        onConfirm={() => kamban && handleDeleteBoard(kamban.id)}
      />
      <Styles.Container>
        <Styles.Header>
          <Box gap={0.5} alignItems="center">
            <ButtonIcon
              onClick={() => router.back()}
              label="backward"
              icon={{
                name: 'arrowLeft'
              }}
            />
            {kamban?.name && (
              <KambanNameForm 
                title={kamban?.name}
                onBlur={name => kambanService.update(id as string, { name })}
              />
            )}
          </Box>
          <Dropdown
            options={[
              {
                label: (
                  <Box gap={1} alignItems="center">
                    <Icon name="trash" color="error" size={15} />
                    <Typography color="error">Delete Board</Typography>
                  </Box>
                ),
                onClick: () => toggleIsOpenDeleteBoardModal()
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
        </Styles.Header>
        <Styles.ColumnList 
          style={{ 
            gridTemplateColumns: `repeat(${(kamban?.columns?.length || 0) + 1}, 350px)`
          }}
        >
          {renderColumn}
          <Styles.Column>
            {id && (
              <Styles.AddColumnButton onClick={toggleIsOpenColumnForm}>+ Add column</Styles.AddColumnButton>
            )}
          </Styles.Column>
        </Styles.ColumnList>
      </Styles.Container>
    </>
  )
}