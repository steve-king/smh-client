import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/client/components/ui/dropdown-menu'
import { Button } from '@/client/components/ui/button'
import Icon from '@/client/components/Icon'
import { FormDialog, DeleteDialog } from '../../forms'
import { useSpacemesh } from '@/client/context/spacemesh'

interface Props {
  namespace: string
  id: string
  Form: React.ElementType
}

export const Actions = ({ id, namespace, Form }: Props) => {
  const { fetchState } = useSpacemesh()
  const [openForm, setOpenForm] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const deleteItem = () => {
    fetch(`/api/${namespace}/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchState()
        setOpenDeleteDialog(false)
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="flex items-center justify-end gap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mx-1">
          <Button variant="ghost" size="icon">
            <Icon i="actions" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenForm(true)}>
            <Icon i="edit" size="16" className="mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDeleteDialog(true)}
            className="hover:text-red-600"
          >
            <Icon i="delete" size="16" className="mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FormDialog
        title={`Create ${namespace}`}
        desc={`Add a new ${namespace} to your configuration.`}
        open={openForm}
      >
        <Form
          id={id}
          onSubmit={() => setOpenForm(false)}
          onCancel={() => setOpenForm(false)}
        />
      </FormDialog>

      <DeleteDialog
        title={`Delete ${namespace}`}
        desc="Are you sure?"
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        deleteItem={deleteItem}
      />
    </div>
  )
}
