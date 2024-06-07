// import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/client/components/ui/form'
import { Button } from '@/client/components/ui/button'
import { Input, InputProps } from '@/client/components/ui/input'
import { Checkbox } from '@/client/components/ui/checkbox'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  host: z.string().min(1, { message: 'Required' }),
  port_public: z.string().min(1, { message: 'Required' }),
  port_private: z.string().min(1, { message: 'Required' }),
  port_post: z.string(),
  smeshing: z.boolean(),
})

export default function NodeForm(props: {
  onSubmit: () => void
  onCancel: () => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      host: '',
      port_public: '',
      port_private: '',
      port_post: '',
      smeshing: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    // Do HTTP request

    // Close the form
    if (typeof props.onSubmit === 'function') {
      props.onSubmit()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }: { field: InputProps }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="host"
          render={({ field }: { field: InputProps }) => (
            <FormItem>
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input placeholder="x.x.x.x" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="port_public"
            render={({ field }: { field: InputProps }) => (
              <>
                <FormItem>
                  <FormLabel>Ports</FormLabel>
                  <FormControl>
                    <Input placeholder=":public" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="port_private"
            render={({ field }: { field: InputProps }) => (
              <FormItem>
                <FormLabel>&nbsp;</FormLabel>
                <FormControl>
                  <Input placeholder=":private" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port_post"
            render={({ field }: { field: InputProps }) => (
              <FormItem>
                <FormLabel>&nbsp;</FormLabel>
                {/* <FormLabel>Port (post)</FormLabel> */}
                <FormControl>
                  <Input placeholder=":post" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="smeshing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel>Smeshing node</FormLabel>
                <FormDescription>
                  (Leave unchecked for 1:n setups)
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" onClick={props.onCancel} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
