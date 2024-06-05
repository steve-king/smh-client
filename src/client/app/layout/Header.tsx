import { ElementType, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, ButtonProps } from '@/client/components/ui/button'
import * as icon from '@/client/components/icons'

const NavigationLink = ({
  to,
  Icon,
  children,
}: {
  to: string
  Icon: ElementType
  children: ReactNode
}) => {
  const iconSize = 20
  const active: ButtonProps['variant'] = 'default'
  const inactive: ButtonProps['variant'] = 'ghost'
  return (
    <NavLink to={to}>
      {(props) => (
        <Button variant={props.isActive ? active : inactive}>
          <Icon size={iconSize} />
          <span className="ml-2">{children}</span>
        </Button>
      )}
    </NavLink>
  )
}

export default function Header() {
  return (
    <header>
      <div className="container py-2 flex items-center justify-between">
        <div className="flex items-center shrink-0">
          <h1 className="-ml-2 -mr-2 flex items-center">
            <img src={icon.spacemeshLight} width="48" height="auto" />
            <span className="font-medium">SMH Client</span>
          </h1>
        </div>
        <nav className="flex flex-wrap -mr-6">
          <NavigationLink to="/" Icon={icon.Dashboard}>
            Dashboard
          </NavigationLink>
          <NavigationLink to="/node" Icon={icon.Node}>
            Node
          </NavigationLink>
          <NavigationLink to="/services" Icon={icon.Services}>
            Services
          </NavigationLink>
          <NavigationLink to="/events" Icon={icon.Events}>
            Events
          </NavigationLink>
          <NavigationLink to="/peers" Icon={icon.Peers}>
            Peers
          </NavigationLink>
          <NavigationLink to="/settings" Icon={icon.Settings}>
            Settings
          </NavigationLink>
        </nav>
      </div>
    </header>
  )
}
