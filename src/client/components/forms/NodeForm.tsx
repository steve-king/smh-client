// import { ReactNode } from 'react'
import { useState } from 'react'
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)
    fetch('/api/node', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      setIsSubmitting(false)
      if (res.ok && typeof props.onSubmit === 'function') {
        props.onSubmit()
      }
    })
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
                <Input
                  placeholder="Enter name"
                  {...field}
                  disabled={isSubmitting}
                />
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
                <Input
                  placeholder="x.x.x.x"
                  {...field}
                  disabled={isSubmitting}
                />
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
                    <Input
                      placeholder=":public"
                      {...field}
                      disabled={isSubmitting}
                    />
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
                  <Input
                    placeholder=":private"
                    {...field}
                    disabled={isSubmitting}
                  />
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
                  <Input
                    placeholder=":post"
                    {...field}
                    disabled={isSubmitting}
                  />
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
            <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
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
          <Button
            type="button"
            onClick={props.onCancel}
            variant="secondary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
