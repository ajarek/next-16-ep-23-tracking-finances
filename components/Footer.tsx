"use client"
import { ChartLine, History, Home, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()
  return (
    <div className='h-20 fixed bottom-0 left-0 right-0 z-50 w-full flex flex-row items-center justify-around gap-4 p-2 md:p-6 bg-background/80 backdrop-blur-md border-t-2 border-border'>
      <Link
        href='/'
        className={`flex flex-col items-center gap-2 ${pathname === "/" ? "text-primary" : ""}`}
      >
        <Home />
        <p>Strona główna</p>
      </Link>
      <Link
        href='/history'
        className={`flex flex-col items-center gap-2 ${pathname === "/history" ? "text-primary" : ""}`}
      >
        <History />
        <p>Historia</p>
      </Link>
      <Link
        href='/statistics'
        className={`flex flex-col items-center gap-2 ${pathname === "/statistics" ? "text-primary" : ""}`}
      >
        <ChartLine />
        <p>Statystyki</p>
      </Link>
      <Link
        href='/settings'
        className={`flex flex-col items-center gap-2 ${pathname === "/settings" ? "text-primary" : ""}`}
      >
        <Settings />
        <p>Ustawienia</p>
      </Link>
    </div>
  )
}

export default Footer
