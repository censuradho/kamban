import * as Dialog from '@radix-ui/react-dialog';
import { styled, keyframes } from 'stitches.config'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});


export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  backdropFilter: 'blur(6px)'
});

export const Content = styled(Dialog.Content, {
  backgroundColor: '$foreground',
  borderRadius: '$default',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '90vh',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
  padding: '35px',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: 0
  },
});


export const Container = styled('div', {})


export const Form = styled('form', {
  width: '100%',
  margin: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  flex: 1,
})

export const {
  Root,
  Portal,
  Trigger,
  Close
} = Dialog