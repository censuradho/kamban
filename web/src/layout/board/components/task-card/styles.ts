import { styled } from 'stitches.config'


export const Name = styled('strong', {
  fontSize: '$sm',
  fontWeight: 500,
})

export const Description = styled('p', {
  fontSize: '$xsm',
  fontWeight: 500,
})

export const Container = styled('div', {
  padding: '23px 16px',
  boxShadow: '0 4px 6px rgba(54,78,126,.102)',
  background: '$foreground',
  borderRadius: '$default',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  '&:hover': {
    [`${Name}`]: {
      color: '$primary'
    }
  }
})
