import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/client/components/ui/alert-dialog'
import { Button } from '@/client/components/ui/button'

interface Props {
  title: string
  desc?: string
  open: boolean
  setOpen: (open: boolean) => void
  deleteItem: () => void
}
export const DeleteDialog = ({
  title,
  desc,
  open,
  setOpen,
  deleteItem,
}: Props) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {desc && <AlertDialogDescription>{desc}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => deleteItem()}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
