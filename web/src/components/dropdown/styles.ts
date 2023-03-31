import { styled, keyframes } from 'stitches.config'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const contentStyles = {
  minWidth: 170,
  backgroundColor: '$foreground',
  border: '1px solid $border',
  borderRadius: '$default',
  padding: '0.5rem',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};

export const Content = styled(DropdownMenu.Content, contentStyles);
export const Arrow = styled(DropdownMenu.Arrow, { fill: '$foreground' });

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  // color: violet.violet11,
  borderRadius: '$default',
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  userSelect: 'none',
  '&[data-disabled]': {
    // color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&:focus': {
    background: '$background'
  },
  '&[data-highlighted]': {
    // backgroundColor: violet.violet9,
    // color: violet.violet1,
  },
};

export const Item = styled(DropdownMenu.Item, itemStyles);


export const {
  Root,
  Trigger,
  Portal,

} = DropdownMenu