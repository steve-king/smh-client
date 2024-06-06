import { ElementType, ReactNode } from 'react'

import * as UiCard from './ui/card'
import Icon from './Icon'

interface CardProps {
  icon?: string
  children?: ReactNode
}

interface Icon {
  component: ElementType
  props?: {
    color?: string
    size?: number
    strokeWidth?: number
    absoluteStrokeWidth?: boolean
  }
}

const defaultIconProps = { size: 48, strokeWidth: 3, absoluteStrokeWidth: true }

export default function Card({ children, icon }: CardProps) {
  // const Icon = icon?.component
  // const iconProps = {
  //   ...defaultIconProps,
  //   ...icon?.props,
  // }
  return (
    <UiCard.Card className="flex items-center">
      {icon && (
        <UiCard.CardContent className="p-6 pr-0">
          <Icon i={icon} size={48} strokeWidth={3} absoluteStrokeWidth={true} />
        </UiCard.CardContent>
      )}
      <UiCard.CardContent className="grow p-4">{children}</UiCard.CardContent>
    </UiCard.Card>
  )
}
