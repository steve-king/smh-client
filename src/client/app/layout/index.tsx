import { ReactNode } from 'react'
import { Separator } from '@/client/components/ui/separator'

import Header from './Header'
import Footer from './Footer'

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="container py-4 grow">{props.children}</main>
      <Footer />
    </div>
  )
}
