import { ElementType, ReactNode } from 'react'
import './Layout.css'

import { Separator } from '@/client/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/client/components/ui/tabs'
import { Button } from '@/client/components/ui/button'

import { NavLink } from 'react-router-dom'

import { ButtonProps } from '@/client/components/ui/button'

import logo from '@/client/assets/logo-spacemesh-light.png'

import {
  Cog as SettingsIcon,
  Gauge as DashboardIcon,
  RadioTower as NodeIcon,
  HardDrive as ServicesIcon,
  MessageSquareCode as EventsIcon,
  Network as PeersIcon,
} from 'lucide-react'

interface Props {
  children?: ReactNode
}

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

const Header = () => {
  return (
    <header>
      <div className="container py-2 flex items-center justify-between">
        <div className="flex items-center shrink-0">
          <h1 className="-ml-2 -mr-2 flex items-center">
            <img src={logo} width="48" height="auto" />
            <span className="font-medium">SMH Client</span>
          </h1>
        </div>
        <nav className="flex flex-wrap -mr-6">
          <NavigationLink to="/" Icon={DashboardIcon}>
            Dashboard
          </NavigationLink>
          <NavigationLink to="/node" Icon={NodeIcon}>
            Node
          </NavigationLink>
          <NavigationLink to="/services" Icon={ServicesIcon}>
            Services
          </NavigationLink>
          <NavigationLink to="/events" Icon={EventsIcon}>
            Events
          </NavigationLink>
          <NavigationLink to="/peers" Icon={PeersIcon}>
            Peers
          </NavigationLink>
          <NavigationLink to="/settings" Icon={SettingsIcon}>
            Settings
          </NavigationLink>
        </nav>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer>
      <div className="py-4 container text-center text-muted-foreground text-xs">
        Server is connected...
      </div>
    </footer>
  )
}

const TabContent = (props: {
  title: string
  value: string
  Icon?: React.ElementType
  children?: ReactNode
}) => {
  const { Icon } = props
  return (
    <TabsContent value={props.value}>
      <div className="flex items-center">
        {Icon && <Icon className="mr-2" size={32} />}
        <h1 className="text-2xl font-semibold">
          <span>{props.title}</span>
        </h1>
      </div>
      <Separator className="my-4" />
      {props.children}
    </TabsContent>
  )
}

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Separator />
      <main className="container py-4">{props.children}</main>
      <Footer />
    </>
  )
}
