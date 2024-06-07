import { ElementType, ReactNode } from 'react'
import { LucideProps } from 'lucide-react'
import { cn } from '@/client/lib/utils'

import * as UiCard from './ui/card'
import Icon from './Icon'

interface CardProps {
  className?: string
  icon?: string
  iconProps?: LucideProps
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

// const defaultIconProps = { size: 48, strokeWidth: 3, absoluteStrokeWidth: true }

export default function Card({
  className,
  children,
  icon,
  iconProps,
}: CardProps) {
  return (
    <UiCard.Card className={cn('flex items-center', className)}>
      {icon && (
        <UiCard.CardContent className="p-6 pr-0">
          <Icon i={icon} size={40} {...iconProps} />
        </UiCard.CardContent>
      )}
      <UiCard.CardContent className="grow p-4">{children}</UiCard.CardContent>
    </UiCard.Card>
  )
}
