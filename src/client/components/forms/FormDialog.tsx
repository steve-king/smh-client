import { ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/client/components/ui/alert-dialog'

interface Props {
  children: ReactNode
  title: string
  desc?: string
  open: boolean
}
export const FormDialog = ({ children, title, desc, open }: Props) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {desc && <AlertDialogDescription>{desc}</AlertDialogDescription>}
          {children}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
