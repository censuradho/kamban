import { useForm } from 'react-hook-form'

import { Box, Button, ButtonIcon, Select, Typography } from '@/components'
import { InputForm, SelectForm, TextareaForm } from '@/components/hook-form'

import { useBoard } from '@/context/board'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Styles from './styles'
import { TaskFormData } from './types'
import { taskFormSchemaValidation } from './validations'
import { uuid } from 'uuidv4'

export function TaskForm () {
  const { 
    currentBoard,
    toggleIsOpenCreateTask,
    isOpenCreateTaskModal,
    createTask
  } = useBoard()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskFormSchemaValidation)
  })

  const onSubmit = (data: TaskFormData) => {
    if (!currentBoard?.id) return;

    createTask(
      currentBoard?.id, 
      data.columnId, 
      data
    )

    toggleIsOpenCreateTask()
  }

  return (
    <Styles.Root 
      open={isOpenCreateTaskModal} 
      onOpenChange={toggleIsOpenCreateTask}
    >
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box justifyContent="space-between">
            <Typography as="strong" fontWeight="500" size="md">Add New Task</Typography>
            <Styles.Close asChild>
              <ButtonIcon 
                label="close"
                icon={{ name: 'close', color: 'text' }}
              />
            </Styles.Close>
          </Box>
          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <InputForm 
              label="Task name"
              register={register('name')}
              placeholder="e.g Take coffee break"
              errorMessage={errors?.name?.message}
            />
            <TextareaForm 
              label="Description"
              register={register('description')}
              errorMessage={errors?.description?.message}
            />
            <SelectForm
              control={control}
              name="columnId"
              label="Current Status"
              options={
                currentBoard?.columns.map(column => ({
                  label: column.name,
                  value: column.id
                })) || []}
            />
            <Button>Create Task</Button>
          </Styles.Form>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}