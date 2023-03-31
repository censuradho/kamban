
import { useForm } from 'react-hook-form'
import { PropsWithChildren, useEffect, useState } from 'react'
import * as Styles from './styles'
import { ColumnFormData, ColumnFormProps } from './types'
import { Box, Button, ButtonIcon, Typography } from '@/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { columnFormSchemaValidation } from './validations'
import { InputForm } from '@/components/hook-form'
import { columnService } from '@/services/api/kamban/column'

export function ColumnForm (props: PropsWithChildren<ColumnFormProps>) {
  const {
    children,
    data,
    kambanId,
    loading,
    open,
    onOpenChange,
    onSubmit: onSubmitFinished,
  } = props

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ColumnFormData>({
    resolver: yupResolver(columnFormSchemaValidation)
  })

  const onSubmit = async (payload: ColumnFormData) => {
    if (data) await columnService.update(data.id, payload)
    
    if (!data) await columnService.create(kambanId, payload)

    await onSubmitFinished?.()
    reset()

    onOpenChange?.(false)
  }

  useEffect(() => {
    if (!data) return;

    reset({
      name: data.name
    })
  }, [data, reset])

  return (
    <Styles.Root 
      open={open} 
      onOpenChange={onOpenChange}
    >
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
              {data ? 'Edit Coumn' : 'Add New Coumn'}
            </Typography>
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
              label="Column Name"
              register={register('name')}
              errorMessage={errors?.name?.message}
            />
            <Button loading={loading}>{!data ? 'Create Column' : 'Save'}</Button>
          </Styles.Form>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}