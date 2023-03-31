import { styled } from 'stitches.config'

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: '.2s',
  justifyContent: 'center',
  position: 'relative',
  whiteSpace: 'nowrap',
  borderRadius: '40px',

  height: '3.125rem',
  '&:disabled': {
    cursor: 'not-allowed'
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%'
      }
    },
    size: {
      md: {
        paddingRight: '4rem',
        paddingLeft: '4rem',
      }
    },
    variant: {
      primary: {
        background: '$primary',
        padding: '0.7rem 1.4rem',
        border: '1px solid transparent',
        textTransform: 'uppercase',
        letterSpacing: '0.05rem',

        '&:disabled': {
          opacity: 0.7
        },
        '> *': {
          color: 'white',
          fontWeight: 600
        },
        '&:hover': {
          borderColor: 'white',
        },
      },
      danger: {
        background: '$error',
        padding: '0.7rem 1.4rem',
        border: '1px solid transparent',
        textTransform: 'uppercase',
        letterSpacing: '0.05rem',

        '&:disabled': {
          opacity: 0.7
        },
        '> *': {
          color: 'white',
          fontWeight: 600
        },
        '&:hover': {
          borderColor: 'white',
        },
      },
      highlight: {
        background: '$primaryLighter',
        padding: '0.7rem 1.4rem',
        border: '1px solid transparent',
        textTransform: 'uppercase',
        letterSpacing: '0.05rem',
        
        '&:disabled': {
          opacity: 0.7
        },
        '> *': {
          color: '$primary',
          fontWeight: 600
        },
        '&:hover': {
          borderColor: 'white',
        },
      },
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export const LoaderContainer = styled('div', {

})