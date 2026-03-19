"use client"

import { ModeToggle } from "./ModeToggle"
import StreamlineStickiesColorPileOfMoney from "../public/MoneyIcons"
import Link from "next/link"
const Navbar = () => {
  return (
    <nav className='w-full max-w-8xl mx-auto h-16 flex items-center justify-between md:px-8 px-4 border-b'>
      <Link href='/' className='flex items-center gap-4'>
        <StreamlineStickiesColorPileOfMoney />
        <span className='text-2xl font-bold'>FinTrack</span>
      </Link>

      <div className='flex items-center gap-2'>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
