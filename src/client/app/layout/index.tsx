import { ReactNode } from 'react'
import { Separator } from '@/client/components/ui/separator'

import Header from './Header'
import Footer from './Footer'

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
