import { useForm } from 'react-hook-form'

import { Box, Button, ButtonIcon, Typography } from '@/components'
import { InputForm, SelectForm, TextareaForm } from '@/components/hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Styles from './styles'
import { TaskFormData, TaskFormProps } from './types'
import { taskFormSchemaValidation } from './validations'
import { useEffect, useState } from 'react'
import { useBoolean } from '@/hooks'
import { taskService } from '@/services/api/kamban/task'
import { columnService } from '@/services/api/kamban/column'

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
  const [toColumnId, setToColumnId] = useState('')

  const onSubmit = async (payload: TaskFormData) => {
    try {
      toggleIsLoading()

      const isMovingCrossColumn = toColumnId !== columnId && taskToEdit && columnId
      const isEditing = !!taskToEdit
      const isCreating = !!columnId && !isEditing

      if (isEditing) {
        await taskService.update(taskToEdit.id, payload)
      }

      if (isCreating) {
        await taskService.create(columnId, payload)
      }
      
      if (isMovingCrossColumn) {
        await columnService.moveTask(columnId, taskToEdit.id, toColumnId)
      }

      reset()
      onSubmitComplete?.()
    } finally {
      toggleIsLoading()
    }
  }

  const handleOpenChange = async (open: boolean) => {
    onOpenChange?.(open)
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
      onOpenChange={handleOpenChange}
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
                onValueChange={setToColumnId}
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