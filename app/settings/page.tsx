"use client"
import { Bell } from "lucide-react"
import { useState } from "react"
import Switch from "@/components/Switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { categories } from "@/data/data-categories"
import { useCategoryLimitsStore } from "@/store/categoryLimits"
import type { CategoryLimits } from "@/types/typeCategory"

const CATEGORY_MAP: Record<
  string,
  keyof Omit<CategoryLimits, "powiadomienia">
> = {
  Rozrywka: "rozrywka",
  Zdrowie: "zdrowie",
  Opłaty: "oplaty",
  Zakupy: "zakupy",
  Restauracje: "restauracje",
  Edukacja: "edukacja",
  Inne: "inne",
}

const SettingsPage = () => {
  const [checked, setChecked] = useState(false)
  const { limit, setLimit } = useCategoryLimitsStore()

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      powiadomienia: checked,
      rozrywka: Number(formData.get("Rozrywka") || 0),
      zdrowie: Number(formData.get("Zdrowie") || 0),
      oplaty: Number(formData.get("Opłaty") || 0),
      zakupy: Number(formData.get("Zakupy") || 0),
      restauracje: Number(formData.get("Restauracje") || 0),
      edukacja: Number(formData.get("Edukacja") || 0),
      inne: Number(formData.get("Inne") || 0),
    }
    setLimit(data)
    toast.success("Ustawienia zostały zapisane!", {
      position: "bottom-right",
    })
  }
  return (
    <div className='w-full min-h-[calc(100vh-4rem)] max-w-6xl mx-auto flex flex-col items-center justify-start gap-4 px-4 md:px-8 pt-4 pb-20'>
      <h1 className='text-2xl font-bold text-center'>Ustawienia</h1>
      <div className='w-full flex  items-center justify-between '>
        <div className='flex items-center justify-center gap-2'>
          <Bell className='text-primary' />
          <p className='text-center'>Ustawienia powiadomień</p>
        </div>
        <div className='flex items-center space-x-2'>
          <Switch checked={checked} onChange={() => setChecked(!checked)} />
        </div>
      </div>
      {checked ? (
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-col gap-2 w-full'
        >
          <h2 className='text-xl font-bold'>Alerty oparte na kategoriach</h2>
          <p>Możesz ustawić osobne limity wydatków dla każdej kategorii.</p>
          {categories.map((category) => (
            <div
              key={category.name}
              className='flex items-center justify-between border-b border-input pb-2'
            >
              <Label htmlFor={category.name} className='text-xl'>
                {category.icon} {category.name}
              </Label>
              <Input
                name={category.name}
                type='number'
                id={category.name}
                className='w-1/4'
                defaultValue={
                  limit ? limit[CATEGORY_MAP[category.name]] || 0 : 0
                }
              />
            </div>
          ))}

          <Button
            type='submit'
            className='w-full h-10 bg-accent text-accent-foreground mt-4 text-xl hover:bg-accent/80 cursor-pointer'
          >
            Zapisz
          </Button>
        </form>
      ) : (
        <p className='text-center'>
          Włącz powiadomienia, aby ustawić limity wydatków.
        </p>
      )}
    </div>
  )
}

export default SettingsPage
