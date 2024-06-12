import * as Lucide from 'lucide-react'
import { ElementType } from 'react'
import { cn } from '../lib/utils'

interface Props extends Lucide.LucideProps {
  i: string | undefined
  className?: string
}

export default function RenderIcon(props: Props) {
  const defaultProps = {
    strokeWidth: 1.5,
  }

  let iconProps = {
    ...defaultProps,
    ...props,
  }

  delete iconProps.i
  delete iconProps.className

  if (props.i !== undefined && icons[props.i] !== undefined) {
    const Icon = icons[props.i]
    return (
      <span className={cn('', props.className)}>
        <Icon {...iconProps} />
      </span>
    )
  }

  return null
}

/**
 * -------------------------------------------------------------------------------------------------
 * ICON LIST
 * https://lucide.dev/
 * -------------------------------------------------------------------------------------------------
 */
const icons: {
  [key: string]: ElementType
} = {
  cog: Lucide.Cog,
  node: Lucide.Radio,
  nodes: Lucide.Radio,
  service: Lucide.HardDrive,
  services: Lucide.Server,
  cpu: Lucide.Cpu,
  dot: Lucide.Dot,
  dashboard: Lucide.ActivitySquare,
  connected: Lucide.Globe,
  disconnected: Lucide.CircleAlert,
  host: Lucide.PcCase,
  peers: Lucide.Network,
  version: Lucide.Github,
  price: Lucide.CircleDollarSign,
  layers: Lucide.Layers3,
  light: Lucide.Sun,
  dark: Lucide.Moon,
  hide: Lucide.EyeOff,
  show: Lucide.Eye,
  network: Lucide.Earth,
  port: Lucide.Unplug,
  name: Lucide.File,
  add: Lucide.CirclePlus,
  delete: Lucide.Trash2,
  edit: Lucide.Pencil,
  actions: Lucide.Ellipsis,
  // settings: Lucide.Settings,
}
