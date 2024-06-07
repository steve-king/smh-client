import { ReactNode } from 'react'
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
  name: z.string(),
  host: z.string(),
  port_public: z.string(),
  port_private: z.string(),
  port_post: z.string(),
  smeshing: z.boolean(),
})

export default function NodeForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      host: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
              {/* <FormDescription>The display name for your node</FormDescription> */}
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

        <div className="flex space-x-4 items-end">
          <FormField
            control={form.control}
            name="port_public"
            render={({ field }: { field: InputProps }) => (
              <>
                <FormItem>
                  <FormLabel>Ports</FormLabel>
                  <FormControl>
                    <Input placeholder="public" {...field} />
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
                <FormControl>
                  <Input placeholder="private" {...field} />
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
                {/* <FormLabel>Port (post)</FormLabel> */}
                <FormControl>
                  <Input placeholder="post" {...field} />
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
            // <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel>Smeshing</FormLabel>
                <FormDescription>(Leave unchecked for 1:n)</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
