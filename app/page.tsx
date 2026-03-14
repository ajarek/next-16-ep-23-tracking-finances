
import { TrendingDown, TrendingUp, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start gap-4 p-4 md:p-8'>
      <div className='w-full  grid grid-cols-3 gap-4 '>
        <div className='w-full flex flex-col items-center justify-center text-xl px-6 h-24 bg-accent rounded-xl'>
          Całkowity Przychód
          <div className="flex items-center gap-2 text-3xl font-bold">
            <TrendingUp />
            {1000} PLN
          </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center text-xl px-6 h-24 bg-primary rounded-xl'>
          Całkowite Koszty
          <div className="flex items-center gap-2 text-3xl font-bold">
            <TrendingDown />
            {300} PLN
          </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center text-xl px-6 h-24 bg-secondary rounded-xl'>
          Saldo
          <div className="flex items-center gap-2 text-3xl font-bold">
            <Wallet />
            {700} PLN
          </div>
        </div>
      </div>
    </div>
  )
}
