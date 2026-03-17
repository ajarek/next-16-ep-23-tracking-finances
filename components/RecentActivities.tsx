"use client"
import { Trash2, Wallet, Funnel, Search } from "lucide-react"
import { useTransactionRegister } from "@/store/transactionRegister"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { useState } from "react"
import { Input } from "./ui/input"

const RecentActivities = ({
  title,
  end,
}: {
  title: string
  end: number | undefined
}) => {
  const { items, removeItemFromRecords } = useTransactionRegister()
  const [filter, setFilter] = useState<"all" | "monthly" | "weekly">("all")
  const [search, setSearch] = useState<string>("")
  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 p-4 '>
      <div className='w-full flex items-center justify-between gap-2'>
        <div className='w-full flex items-center justify-start gap-2 max-md:hidden'>
          <Funnel />
          <h3 className='text-xl font-bold'>Filtry</h3>
        </div>
        <h2 className='w-full text-base md:text-2xl font-bold '>
          {title} ({end ? end : "wszystkie"})
        </h2>
        <div className='w-full flex items-center justify-end gap-2'>
          <div className="relative">
            <Search color="gray" className="absolute left-2 top-1/2 -translate-y-1/2" />
          <Input type="search" placeholder="Szukaj" className="max-md:hidden pl-8" onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Wszystkie
          </Button>
          <Button
            variant={filter === "monthly" ? "default" : "outline"}
            onClick={() => setFilter("monthly")}
          >
            Miesięczne
          </Button>
          <Button
            variant={filter === "weekly" ? "default" : "outline"}
            onClick={() => setFilter("weekly")}
          >
            Tygodniowe
          </Button>
        </div>
      </div>
      {items.length === 0 ? (
        <div className='w-full flex flex-col items-center justify-center gap-4'>
          <Wallet className='w-12 h-12' />
          <p className='text-center'>
            Brak transakcji.
            <br />
            Możesz dodać transakcje za pomocą przycisków powyżej.{" "}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=' text-xl font-bold'>Data</TableHead>
              <TableHead className=' text-xl font-bold'>Opis</TableHead>
              <TableHead className=' text-xl font-bold'>Kategoria</TableHead>
              <TableHead className=' text-xl font-bold'>Kwota</TableHead>
              {!end ? (
                <TableHead className=' text-xl font-bold'>Akcje</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items
              .filter((item) => {
                if (search === "") return true
                return item.description.toLowerCase().includes(search.toLowerCase())
              })
              .filter((item) => {
                if (filter === "all") return true
                if (filter === "monthly")
                  return (
                    new Date(item.date).getMonth() === new Date().getMonth()
                  )
                if (filter === "weekly")
                  return new Date(item.date).getDate() === new Date().getDate()
              })
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .slice(0, end)
              .map((item) => (
                <TableRow
                  key={item.id}
                  className={`${item.type === "income" ? "text-accent" : "text-primary"} text-xl`}
                >
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.amount.toFixed(2)} zł</TableCell>
                  {!end ? (
                    <TableCell>
                      <Button
                        className='text-primary bg-transparent border-none hover:bg-transparent hover:text-primary/80 cursor-pointer'
                        onClick={() => removeItemFromRecords(item.id)}
                      >
                        <Trash2 className='size-6' />
                      </Button>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default RecentActivities
