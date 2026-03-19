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
import { useTransactionRegister } from "@/store/transactionRegister"
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
import { Record } from "@/types/typeRecord"

const formSchema = z.object({
  amount: z.number().min(0.01, "Kwota musi być większa od zera."),
  description: z.string().optional(),
  category: z.string().min(1, "Kategoria jest wymagana."),
  date: z.string().min(1, "Data jest wymagana."),
})

const generateId = () => Math.floor(Math.random() * 10000000)

const AddIncomeForm = () => {
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
      type: "income",
      amount: data.amount,
      category: data.category,
      description: data.description || "",
      date: data.date,
    }
    addItemToRecords(record)
    toast.success("Dochód został dodany pomyślnie!", {
      position: "bottom-right",
    })
    form.reset()
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 '>
          <span className='w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground'>
            <Sparkles />
          </span>{" "}
          <span className='text-3xl text-accent'>Dodaj dochód</span>
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
                        <SelectItem value='Pensja'>Pensja</SelectItem>
                        <SelectItem value='Wynajem'>Wynajem</SelectItem>
                        <SelectItem value='Oprocentowanie'>
                          Oprocentowanie
                        </SelectItem>
                        <SelectItem value='Dywidendy'>Dywidendy</SelectItem>
                        <SelectItem value='Bonus'>Bonus</SelectItem>
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
                        {field.value?.length || 0}/100 znaków
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
            className='w-full h-10 bg-accent text-lg text-accent-foreground hover:bg-accent/90 cursor-pointer'
          >
            Dodaj dochód
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default AddIncomeForm
