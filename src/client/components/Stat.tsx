import { ElementType, ReactNode } from 'react'

import * as UiCard from './ui/card'

interface CardProps {
  icon?: Icon
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
  const Icon = icon?.component
  const iconProps = {
    ...defaultIconProps,
    ...icon?.props,
  }
  return (
    <UiCard.Card className="flex items-center">
      {Icon && (
        <UiCard.CardContent className="p-6 pr-0">
          <Icon {...iconProps} />
        </UiCard.CardContent>
      )}
      <UiCard.CardContent className="grow p-4">{children}</UiCard.CardContent>
    </UiCard.Card>
  )
}
