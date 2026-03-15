'use client'
import { Calendar } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import StreamlineStickiesColorPileOfMoney from "./MoneyIcons"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import Link from "next/link"
const Navbar = () => {
  const [month, setMonth] = useState<string>('current')
  return (
    <nav className='w-full max-w-8xl mx-auto h-16 flex items-center justify-between md:px-8 px-4 border-b'>
      <Link href='/' className='flex items-center gap-4'>
        <StreamlineStickiesColorPileOfMoney />
        <span className='text-2xl font-bold'>FinTrack</span>
      </Link>
      <div>{month === 'current' ? 'Bieżący miesiąc' : 'Poprzedni miesiąc'}</div>
      <div className='flex items-center gap-2'>
        <Select onValueChange={(value) => setMonth(value)}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue>
              <Calendar className='mr-2 h-4 w-4' />{" "}
              <span className=''>Wybierz miesiąc</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='current'>Bieżący miesiąc</SelectItem>
              <SelectItem value='previous'>Poprzedni miesiąc</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
