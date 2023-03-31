import { styled } from 'stitches.config'

export const Container = styled('header', {
  width: '100%',
  minHeight: '70px',
  background: '$foreground',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',

  h1: {
    fontSize: '$md'
  }
})

export const AddTaskMobile = styled('button', {
  width: '40px', 
  height: '40px',
  fontSize: '1rem',
  background: '$primary',
  borderRadius: '10px',
  color: '#fff',
  border: '1px solid transparent',
  
  '&:hover': {
    border: '1px solid #fff'
  }
})