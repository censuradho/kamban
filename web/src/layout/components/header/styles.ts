import { styled } from 'stitches.config'

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  background: '$foreground',
  borderBottom: '1px solid $border'
})