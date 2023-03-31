import { Box, ButtonIcon, DialogAlert, Dropdown, Icon, Select, Typography } from '@/components'
import { useBoard } from '@/context/board'
import { useBoolean } from '@/hooks'
import { useState } from 'react'
import * as Styles from './styles'
import { TaskInfoDialogProps } from './types'

export function TaskInfoDialog (props: TaskInfoDialogProps) {
  const [columnSelected, setColumnSelected] = useState('')
  const [isOpenDeleteModal, toggleIsOpenDeleteModal] = useBoolean(false)

  const { 
    currentBoard,
    moveTaskToColumn,
    deleteTask,
    editBoard
  } = useBoard()

  const {
    data,
    columnId,
    onOpenChange
  } = props

  const handleClose = (open: boolean) => {
    if (columnSelected) moveTaskToColumn(columnId, columnSelected, data.id)
    onOpenChange?.(open)
    setColumnSelected('')
  }

  const handleDelete = (columnId: string, taskId: string) => {
    deleteTask(columnId, taskId)
    toggleIsOpenDeleteModal()
    onOpenChange?.(false)
  }

  return (
    <Styles.Root {...props} onOpenChange={handleClose}>
      <DialogAlert
        title="Delete this task?"
        description={`Are you sure you want to delete the ${data.name} task and its subtasks? This action cannot be reversed.`}
        open={isOpenDeleteModal}
        onOpenChange={toggleIsOpenDeleteModal}
        onCancel={toggleIsOpenDeleteModal}
        onConfirm={() => handleDelete(columnId, data.id)}
      />
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box justifyContent="space-between">
            <Typography as="strong" fontWeight="500" size="md">{data?.name}</Typography>
            <Dropdown 
              options={[
                {
                  label: <Typography>Edit Task</Typography>,
                  onClick: editBoard
                },
                {
                  label: <Typography color="error">Delete Task</Typography>,
                  onClick: toggleIsOpenDeleteModal
                },
              ]}
            >
              <Icon name="verticalDots" color="text" size={20} />
            </Dropdown>
          </Box>
          <Typography size="xsm">{data?.description}</Typography>
          <Select
            label="Current Status"
            defaultValue={columnId}
            onValueChange={setColumnSelected}
            options={
              currentBoard?.columns.map(column => ({
                label: column.name,
                value: column.id
              })) || []
            }
          />
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}