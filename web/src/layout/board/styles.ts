import { styled } from 'stitches.config'

export const Container = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

export const Column = styled('div', {

})

export const ColumnList = styled('div', {
  maxWidth: '100vw',
  overflow: 'hidden',
  padding: '2rem 0 2rem 2rem',
  flex: 1,
  ul: {
    height: '100%',
    display: 'grid',
    overflowX: 'auto',
    listStyle: 'none',
    gap: '1.5rem',
    '&::-webkit-scrollbar': {
      height: 0,
    },
  }
})

export const NewColumnButton = styled('button', {
  background: '$foregroundDark',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: '23px 16px',
  borderRadius: '$default',
  fontSize: '$md',
  color: '$heading',
  fontWeight: 600
})