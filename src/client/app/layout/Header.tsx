import { ElementType, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, ButtonProps } from '@/client/components/ui/button'
import * as Icon from '@/client/components/ui/icons'

import { useTheme } from '../providers/theme-provider'
import ThemeToggle from '@/client/app/layout/theme-toggle'

const NavigationLink = ({
  to,
  Icon,
  iconSize = 24,
  children,
  iconOnly,
}: {
  to: string
  Icon?: ElementType
  iconSize?: number
  iconOnly?: boolean
  children: ReactNode
}) => {
  const active: ButtonProps['variant'] = 'default'
  const inactive: ButtonProps['variant'] = 'ghost'
  return (
    <NavLink to={to}>
      {(props) => (
        <Button
          variant={props.isActive ? active : inactive}
          size={iconOnly ? 'icon' : 'default'}
        >
          {Icon && <Icon size={iconSize} strokeWidth={1} />}
          {!iconOnly && <span className="ml-2">{children}</span>}
        </Button>
      )}
    </NavLink>
  )
}

export default function Header() {
  const theme = useTheme()
  console.log(theme)
  return (
    <header id="header">
      <div className="container py-2 flex items-center justify-between">
        <div className="flex items-center shrink-0">
          <h1 className="-ml-4 -mr-2 flex items-center">
            <img
              src={Icon.SpacemeshLight}
              width="48"
              height="auto"
              className="dark:hidden"
            />
            <img
              src={Icon.SpacemeshDark}
              width="48"
              height="auto"
              className="hidden dark:block"
            />
            <span className="font-medium">SMH Client</span>
          </h1>
        </div>
        <nav className="flex flex-wrap -mr-6">
          <NavigationLink to="/" Icon={Icon.Dashboard}>
            Dashboard
          </NavigationLink>
          <NavigationLink to="/node" Icon={Icon.Node}>
            Node
          </NavigationLink>
          <NavigationLink to="/services" Icon={Icon.Services}>
            Services
          </NavigationLink>
          <NavigationLink to="/events" Icon={Icon.Events}>
            Events
          </NavigationLink>
          <NavigationLink to="/peers" Icon={Icon.Peers}>
            Peers
          </NavigationLink>
        </nav>
        <nav>
          <Button variant="ghost" size="icon">
            <Icon.Hide strokeWidth={1} />
          </Button>
          <ThemeToggle />
          <NavigationLink to="/settings" Icon={Icon.Settings} iconOnly>
            Settings
          </NavigationLink>
        </nav>
      </div>
    </header>
  )
}
