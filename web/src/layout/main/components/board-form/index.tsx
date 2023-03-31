import { Box, Button, ButtonIcon, Typography } from '@/components'
import { InputForm } from '@/components/hook-form'
import { Label } from '@/components/input/styles'
import { useBoard } from '@/context/board'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

import { useFieldArray, useForm } from 'react-hook-form'
import * as Styles from './styles'
import { BoardFormData } from './types'
import { newBoardSchemaValidation } from './validations'

const baseColumn = {
  name: '',
}
export function BoardForm () {
  const { 
    upsertBoard,
    isOpenCreateBoardModal,
    editBoardData,
    closeBoardForm,
    currentBoard
  } = useBoard()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<BoardFormData>({
    resolver: yupResolver(newBoardSchemaValidation),
    defaultValues: {
      columns: [baseColumn]
    },
  })

  const { 
    fields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: 'columns'
  })

  const onSubmit = (data: BoardFormData) => {
    upsertBoard(data, currentBoard?.id)
    closeBoardForm()
  }

  const renderColumnFields = fields.map((field, index) => (
    <Box key={index} alignItems="center" gap={0.5}>
      <InputForm
        fullWidth
        register={register(`columns.${index}.name`)}
        errorMessage={errors?.columns?.[index]?.name?.message}
      />
      <ButtonIcon
        label="close"
        onClick={() => remove(index)}
        icon={{ 
          name: 'trash',
          color: 'text' 
        }}
      />
    </Box>
  ))

  const title = editBoardData ? 'Edit Board' : 'Add New Board'

  useEffect(() => {
    reset({
      name: editBoardData?.name,
      columns: editBoardData?.columns
    })

    return () => reset()
  }, [editBoardData, reset])

  return (
    <Styles.Root open={isOpenCreateBoardModal} onOpenChange={closeBoardForm}>
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box justifyContent="space-between">
            <Typography as="strong" size="md">{title}</Typography>
            <Styles.Close asChild>
              <ButtonIcon 
                label="close"
                icon={{ name: 'close', color: 'text' }}
              />
            </Styles.Close>
          </Box>
          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              placeholder="e.g Sprint 1"
              label="Board Name"
              register={register('name')}
              errorMessage={errors?.name?.message}
            />
            <Box flexDirection="column" gap={0.5}>
              <Label>Board Columns</Label>
              {renderColumnFields}
              <Box marginTop={1.5}>
                <Button type="button" onClick={() => append([baseColumn])}>Add Column</Button>
              </Box>
            </Box>
            <Box marginTop={1.5}>
              <Button fullWidth>{editBoardData ? 'Save' : 'Create New Board'}</Button>
            </Box>
          </Styles.Form>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}