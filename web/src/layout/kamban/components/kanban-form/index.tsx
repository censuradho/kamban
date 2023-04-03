import { PropsWithChildren } from 'react'
import * as Styles from './styles'
import { KanbanFormData, KanbanFormProps } from './types'
import { Box, Button, ButtonIcon, Typography } from '@/components'
import { useFieldArray, useForm } from 'react-hook-form'
import { InputForm } from '@/components/hook-form'
import { Label } from '@/components/input/styles'

const baseColumn = {
  name: '',
}

export function KanbanForm (props: PropsWithChildren<KanbanFormProps>) {
  const { children } = props

  const {
    register,
    control,
    formState: { errors }
  } = useForm<KanbanFormData>({
    defaultValues: {
      columns: [baseColumn]
    },
  })

  const {
    fields,
    remove,
    append
  } = useFieldArray({
    control,
    name: 'columns'
  })

  const renderFields = fields?.map(((value, index) => {
    return (
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
    )
  }))
  return (
    <Styles.Root>
      <Styles.Trigger>{children}</Styles.Trigger>
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box justifyContent="space-between">
            <Typography 
              as="strong" 
              color="heading" 
              fontWeight="500"
              size="md"
            >
              New Board
            </Typography>
            <Styles.Close asChild>
              <ButtonIcon 
                label="close"
                icon={{ name: 'close', color: 'text' }}
              />
            </Styles.Close>
          </Box>
          <Styles.Form>
            <InputForm 
              register={register('name')}
              label="Board name"
            />

            <Box flexDirection="column" gap={0.5}>
              <Label>Board Columns</Label>
              {renderFields}
              <Box marginTop={1.5}>
                <Button type="button" onClick={() => append([baseColumn])}>Add Column</Button>
              </Box>
            </Box>
            <Typography size="xsm">Use board template</Typography>
          </Styles.Form>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}