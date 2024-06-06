import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, ButtonProps } from '@/client/components/ui/button'
import ThemeToggle from '@/client/app/layout/theme-toggle'
import Icon from '@/client/components/RenderIcon'
import logoLight from '@/client/assets/logo-spacemesh-trans-black.png'
import logoDark from '@/client/assets/logo-spacemesh-trans-white.png'

const NavigationLink = ({
  to,
  icon,
  iconSize = 24,
  children,
  iconOnly,
}: {
  to: string
  icon?: string
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
          className="mx-1"
        >
          {icon && (
            <Icon
              i={icon}
              size={iconSize}
              strokeWidth={2}
              absoluteStrokeWidth={true}
            />
          )}
          {!iconOnly && <span className="ml-2">{children}</span>}
        </Button>
      )}
    </NavLink>
  )
}

export default function Header() {
  return (
    <header className="app-header bg-card border-b p-2 flex items-center justify-between">
      <h1 className="-mr-2 flex-1 flex items-center">
        <img src={logoLight} width="48" height="auto" className="dark:hidden" />
        <img
          src={logoDark}
          width="48"
          height="auto"
          className="hidden dark:block"
        />
        <span className="font-medium">SMH Client</span>
      </h1>

      <nav className="flex-2">
        <NavigationLink to="/" icon="dashboard">
          Dashboard
        </NavigationLink>
        <NavigationLink to="/nodes" icon="node">
          Nodes
        </NavigationLink>
        <NavigationLink to="/services" icon="service">
          Services
        </NavigationLink>
      </nav>
      <nav className="flex-1 text-right">
        <Button variant="ghost" size="icon" className="mx-1">
          <Icon i="hide" strokeWidth={2} />
        </Button>
        <ThemeToggle />
        <NavigationLink to="/settings" icon="cog" iconOnly>
          Settings
        </NavigationLink>
      </nav>
    </header>
  )
}
