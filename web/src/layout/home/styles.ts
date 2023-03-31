import { styled } from 'stitches.config'

export const Container = styled('div', {
  width: '100%',
  height: 'calc(100vh - 69px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem'
})



export const Content = styled('div', {
  width: '100%',
  margin: '0 auto',
  maxWidth: '30rem',
  border: '1px solid $border',
  borderRadius: '$default',
  maxHeight: '80%',
  display: 'flex',
  flexDirection: 'column'
})

export const Header = styled('header', {
  padding: '0.5rem 2rem',
  background: '$foreground',
  display: 'flex',
  justifyContent: 'space-between'
})

export const Item = styled('li', {
  padding: '1.4rem 2rem',
 
  a: {
    color: '$text',
  },

  'a:hover': {
    color: '$primary'
  }
})

export const List = styled('ul', {
  listStyle: 'none',
  overflowY: 'auto',
  flex: 1,
  height: '100%',
  'li:not(li:last-child)': {
    borderBottom: '1px solid $border'
  },
  'li:first-child': {
    borderTop: '1px solid $border'
  }
})


