import { styled } from 'stitches.config'
import * as Switch from '@radix-ui/react-switch';

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  background: '$background',
  padding: '14px',
  borderRadius: '$default'
})

export const SwitchRoot = styled(Switch.Root, {
  all: 'unset',
  width: 40,
  height: 20,
  backgroundColor: '$primary',
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  cursor: 'pointer',

  '&:hover': {
    background: '$primaryLight'
  }
});

export const SwitchThumb = styled(Switch.Thumb, {
  display: 'block',
  width: 14,
  height: 14,
  backgroundColor: 'white',
  borderRadius: '9999px',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});