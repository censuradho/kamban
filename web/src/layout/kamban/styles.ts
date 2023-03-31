import { styled } from 'stitches.config'

export const Container = styled('main', {
  height: 'calc(100vh - 69px)',
  display: 'flex',
  flexDirection: 'column'
})

export const Header = styled('header', {
  padding: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  background: '$foreground',
  borderBottom: '1px solid $border'
})

export const Column = styled('li', {
  background: '$foreground',
  border: '1px solid $border',
  width: '100%',
  maxWidth: '350px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden'
})

export const ColumnList = styled('ul', {
  display: 'grid',
  gap: '1rem',
  flex: 1,
  overflowX: 'auto',
  padding: '8px 32px',
  '::-webkit-scrollbar': {
    width: '10px',
    borderRadius: '$default'
  },
  'scroll-behavior': 'smooth',
  /* Track */
  '::-webkit-scrollbar-track': {
    background: '$background',
    borderRadius: '$default'
  },
  
  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: '$border',
    borderRadius: '$default'
  },
  [`${Column}:last-child`]: {
    height: '2rem',
  }
})

export const ColumnHeader = styled('div', {
  padding: '8px 16px 4px',
})

export const ColumnBody = styled('ul', {
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

export const ColumnFooter = styled('div', {

})

export const ColumnAddTaskButton = styled('button', {
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

export const Task = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  padding: '8px 16px 4px',
})

export const AddColumnButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  fontSize: '$sm',
  color: '$heading',
})