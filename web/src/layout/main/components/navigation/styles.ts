import { styled, keyframes } from 'stitches.config'
import * as Dialog from '@radix-ui/react-dialog';

export const Container = styled('div', {})

export const {
  Root,
  Trigger,
  Portal,

} = Dialog

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { transform: 'translateX(-100)' },
  '100%': { transform: 'translateX(0)' },
});

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  backdropFilter: 'blur(6px)'
});

export const Content = styled(Dialog.Content, {
  background: '$foreground',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '90vw',
  maxWidth: '300px',
  height: '100%',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
  display: 'flex',
  flexDirection: 'column',
});

export const Nav = styled('nav', {
  flex: 1,
  overflowY: 'auto'
})

export const Header = styled('header', {
  padding: '25px'
})

export const BoardList = styled('ul', {
  listStyle: 'none',
  paddingRight: '25px'
})

export const BoardItem = styled('div', {
  button: {
    color: '$primary',
    width: '100%',
    display: 'flex',
    fontSize: '$sm',
    fontWeight: 600,
    padding: '15px 24px',
    borderRadius: '0 25px 25px 0',
    outline: 'none',
    '&:hover': {
      background: '$primaryLighter',
      color: '$primary'
    },
  },
  a: {
    width: '100%',
    display: 'flex',
    fontSize: '$sm',
    color: '$text',
    fontWeight: 600,
    padding: '15px 24px',
    borderRadius: '0 25px 25px 0',
    outline: 'none',
    '&.active': {
      color: '#fff',
      background: '$primary'
    },
    '&:hover': {
      background: '$primaryLighter',
      color: '$primary'
    },
  },


})