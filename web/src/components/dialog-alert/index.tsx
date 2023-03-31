import { Button } from '@/components'
import { Box } from '../box'
import { Typography } from '../typography'
import * as Styles from './styles'
import { DialogAlertProps } from './types'

export function DialogAlert  (props: DialogAlertProps) {
  const {
    description,
    title,
    onCancel,
    onConfirm,
    loading,
    ...otherProps
  } = props

  return (
    <Styles.Root {...otherProps}>
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Typography color="heading" size="md" as="strong">{title}</Typography>
          <Typography as="P" color="text">{description}</Typography>
          <Box gap={1} justifyContent="flex-end" marginTop={2}>
            <Button disabled={loading} onClick={onCancel} variant="highlight">Cancel</Button>
            <Button loading={loading} onClick={onConfirm} variant="danger">Confirm</Button>
          </Box>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}