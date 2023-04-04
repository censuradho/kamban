import { styled } from 'stitches.config'

export const Container = styled('div', {
  background: '$foreground',
  border: '1px solid $border',
  width: '100%',
  maxWidth: '350px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
})

export const Header = styled('header', {
  padding: '8px 16px 4px',
})

export const Body = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'auto',
  gap: '1rem',
  listStyle: 'none',
  
  li: {
    width: '100%'
  }
})

export const Footer = styled('footer', {

})

export const AddTaskButton = styled('button', {
  display: 'flex',
  width: '100%',
  height: '2.5rem',
  alignItems: 'center',
  padding: '8px 16px 4px',
  color: '$text',
  outline: 0,
  
  '&:hover, &:focus': {
    background: '$foregroundDark',
  }
})