import { LinkProps } from 'next/link'

import { VariantProps } from '@stitches/react'
import { Icon } from '@/components'
import {
  ComponentProps,
  ButtonHTMLAttributes,
  ReactNode,
  AnchorHTMLAttributes
} from 'react'
import { Button } from './styles'

type RootButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'onFocus' | 'id' | 'type' | 'disabled' | 'form'
>;

export interface ButtonProps
  extends VariantProps<typeof Button>,
    RootButtonProps {
  children: ReactNode;
  icon?: ComponentProps<typeof Icon>;
  loading?: boolean;
}