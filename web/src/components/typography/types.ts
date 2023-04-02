import { VariantProps } from '@stitches/react'
import { ReactNode } from 'react'

import { Typography } from './styles'
import { fontSizes } from '@/constants/theme'
import { darkColors } from '@/constants/theme/dark/colors'

export type VariantFontSize = Record<keyof typeof fontSizes, { fontSize: keyof typeof fontSizes }>
export type VariantColors = Record<keyof typeof darkColors, { color: keyof typeof darkColors }>

type Variant = VariantProps<typeof Typography>

export interface TypographyProps extends Variant {
  children: ReactNode
  as?: any
  id?: string
}
''