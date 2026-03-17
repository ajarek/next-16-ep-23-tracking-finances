"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Sparkles } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTransactionRegister } from "@/store/transactionRegister"
import { Record } from "@/types/typeRecord"

const formSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1 character."),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required."),
  date: z.string().min(1, "Date is required."),
})
const generateId = () => Math.floor(Math.random() * 10000000);

const AddExpenseForm = () => {
  const { addItemToRecords } = useTransactionRegister()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: "",
      date: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
   const record: Record = {
         id: generateId(),
         type: "expense",
         amount: data.amount,
         category: data.category,
         description: data.description || "",
         date: data.date,
       }
    addItemToRecords(record)
    toast("You submitted the following values:", {
      description: (
        <pre className='mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
    form.reset()
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 '>
          <span className='w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground'>
            <Sparkles />
          </span>{" "}
          <span className='text-3xl text-primary'>Dodaj wydatek</span>
        </CardTitle>
        <CardDescription>Wpisz kwotę i wybierz kategorię.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='amount'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-amount'>Kwota</FieldLabel>
                  <Input
                    {...field}
                    value={Number.isNaN(field.value) ? "" : field.value}
                    type='number'
                    id='form-rhf-demo-amount'
                    min={0}
                    step={0.01}
                    aria-invalid={fieldState.invalid}
                    placeholder='0.00'
                    autoComplete='off'
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='category'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className='w-full max-w-xs'>
                  <FieldLabel htmlFor='form-rhf-select-category'>
                    Kategoria
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id='form-rhf-select-category'
                      aria-invalid={fieldState.invalid}
                      className='min-w-[120px]'
                    >
                      <SelectValue placeholder='Wybierz kategorię' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='Transport'>
                          Transport
                        </SelectItem>
                        <SelectItem value='Rozrywka'>Rozrywka</SelectItem>
                        <SelectItem value='Zdrowie'>Zdrowie</SelectItem>
                        <SelectItem value='Opłaty'>Opłaty</SelectItem>
                        <SelectItem value='Zakupy'>Zakupy</SelectItem>
                        <SelectItem value='Restauracja'>Restauracja</SelectItem>
                        <SelectItem value='Edukacja'>Edukacja</SelectItem>
                        <SelectItem value='Inne'>Inne</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name='date'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-date'>Data</FieldLabel>
                  <Input
                    {...field}
                    type='date'
                    id='form-rhf-demo-date'
                    aria-invalid={fieldState.invalid}
                    placeholder='Wybierz datę'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-description'>
                    Opis (opcjonalnie)
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id='form-rhf-demo-description'
                      placeholder='Opisz swój dochód...'
                      rows={6}
                      className='min-h-12 resize-none'
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align='block-end'>
                      <InputGroupText className='tabular-nums'>
                        {field.value?.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button
            type='submit'
            form='form-rhf-demo'
            className='w-full h-10 bg-primary text-lg text-primary-foreground hover:bg-primary/90 cursor-pointer'
          >
            Dodaj wydatek
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default AddExpenseForm
