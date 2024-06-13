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
import { ServiceConfig } from '@/types'

const defaults: ServiceConfig = {
  id: '',
  name: '',
  host: '',
  port_operator: '',
  su: '',
}

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Required' }),
  host: z.string().min(1, { message: 'Required' }),

  // TODO: port validation
  // A range error will crash netSocket (and there fore the entire server) if the error is not prevented
  /**
   * >= 0 and < 65536
   */
  port_operator: z.string().min(1, { message: 'Required' }),
  su: z.string(),
})

interface Props {
  id?: string | undefined
  values?: ServiceConfig
  url?: string
  method?: string
  onSubmit: () => void
  onCancel: () => void
}

export const ServiceForm = ({
  values = defaults,
  url = '/api/services',
  method = 'POST',
  onSubmit,
  onCancel,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  })

  function submit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      setIsSubmitting(false)
      if (res.ok && typeof onSubmit === 'function') onSubmit()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
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

        <FormField
          control={form.control}
          name="port_operator"
          render={({ field }: { field: InputProps }) => (
            <>
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input
                    placeholder=":operator"
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
          name="su"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SU</FormLabel>
              <FormControl>
                <Input placeholder="SU" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
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
