import { styled } from 'stitches.config'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  padding: '8px 16px 4px',

  variants: {
    isDragging: {
      true: {
        opacity: 0.4
      }
    }
  }
})