import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Button,
  ButtonProps,
  buttonVariants,
} from '@/client/components/ui/button'
import ThemeToggle from '@/client/app/layout/theme-toggle'
import Icon from '@/client/components/Icon'
import logoLight from '@/client/assets/logo-spacemesh-trans-black.png'
import logoDark from '@/client/assets/logo-spacemesh-trans-white.png'
import { cn } from '@/client/lib/utils'

const NavigationLink = ({
  to,
  text,
  icon,
}: {
  to: string
  text?: string
  icon?: string
}) => {
  const inactiveClass = buttonVariants({
    variant: 'ghost',
    size: text ? 'default' : 'icon',
    className: 'mx-1',
  })

  const activeClass = buttonVariants({
    variant: 'default',
    size: text ? 'default' : 'icon',
    className: 'mx-1',
  })

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
    >
      <Icon i={icon} />
      {text && <span className="ml-2 font-bold">{text}</span>}
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
        <NavigationLink to="/" icon="dashboard" text="Dashboard" />
        <NavigationLink to="/nodes" icon="node" text="Nodes" />
        <NavigationLink to="/services" icon="service" text="Services" />
      </nav>
      <nav className="flex-1 text-right">
        <Button variant="ghost" size="icon" className="mx-1">
          <Icon i="hide" />
        </Button>
        <ThemeToggle />
        <NavigationLink to="/settings" icon="cog" />
      </nav>
    </header>
  )
}
