import { useForm } from 'react-hook-form'

import { Box, Button, ButtonIcon, Typography } from '@/components'
import { InputForm, SelectForm, TextareaForm } from '@/components/hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Styles from './styles'
import { TaskFormData, TaskFormProps } from './types'
import { taskFormSchemaValidation } from './validations'
import { useEffect } from 'react'
import { useBoolean } from '@/hooks'
import { taskService } from '@/services/api/kamban/task'

export function TaskForm (props: TaskFormProps) {
  const {
    onOpenChange,
    open,
    taskToEdit,
    columnId,
    columns,
    onSubmit: onSubmitComplete
  } = props

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskFormSchemaValidation)
  })

  const [isLoading, toggleIsLoading] = useBoolean(false)

  const onSubmit = async (payload: TaskFormData) => {
    try {
      toggleIsLoading()

      if (taskToEdit) {
        await taskService.update(taskToEdit.id, payload)
      }

      if (columnId) {
        await taskService.create(columnId, payload)
      }
      reset()
      onSubmitComplete?.()
    } finally {
      toggleIsLoading()
    }
  }

  useEffect(() => {
    if (!taskToEdit) return;

    reset({
      description: taskToEdit?.description,
      name: taskToEdit?.name,
    })

  }, [taskToEdit, reset])

  return (
    <Styles.Root 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box justifyContent="space-between">
            <Typography 
              as="strong" 
              color="heading" 
              fontWeight="500"
              size="md"
            >{taskToEdit ? 'Edit Task' : 'Add New Task'}</Typography>
            <Styles.Close asChild>
              <ButtonIcon 
                label="close"
                icon={{ name: 'close', color: 'text' }}
              />
            </Styles.Close>
          </Box>
          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              id="name"
              label="Task name"
              register={register('name')}
              placeholder="e.g Take coffee break"
              errorMessage={errors?.name?.message}
            />
            <TextareaForm
              id="description"
              label="Description"
              register={register('description')}
              errorMessage={errors?.description?.message}
            />
            {taskToEdit && (
              <SelectForm
                id="columnId"
                control={control}
                name="columnId"
                defaultValue={columnId}
                label="Current Status"
                options={
                  columns?.map(column => ({
                    label: column.name,
                    value: column.id
                  })) || []}
              />
            )}
            <Button loading={isLoading}>{taskToEdit ? 'Save' : 'Create Task'}</Button>
          </Styles.Form>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}