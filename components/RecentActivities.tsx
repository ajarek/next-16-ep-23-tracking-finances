"use client"
import { Trash2, Wallet } from "lucide-react"
import { useTransactionRegister } from "@/store/transactionRegister"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"

const RecentActivities = ({title, end}: {title: string, end: number | undefined}) => {
  const {items, removeItemFromRecords} = useTransactionRegister()
  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 p-4 '>
      <h2 className='text-2xl font-bold'>{title} ({end? end : 'wszystkie'})</h2>
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
            <TableRow >
              <TableHead className=" text-xl font-bold">Data</TableHead>
              <TableHead className=" text-xl font-bold">Opis</TableHead>
              <TableHead className=" text-xl font-bold">Kategoria</TableHead>
              <TableHead className=" text-xl font-bold">Kwota</TableHead>
              {!end ? <TableHead className=" text-xl font-bold">Akcje</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, end)
            .map((item) => (
              <TableRow key={item.id} className={`${item.type === 'income' ? 'text-accent' : 'text-primary'} text-xl`}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.amount.toFixed(2)} zł</TableCell>
                {!end ? <TableCell><Button className='text-primary bg-transparent border-none hover:bg-transparent hover:text-primary/80 cursor-pointer' onClick={() => removeItemFromRecords(item.id)}><Trash2 className="size-6" /></Button></TableCell> : null}
              </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </div>
  )
}

export default RecentActivities
