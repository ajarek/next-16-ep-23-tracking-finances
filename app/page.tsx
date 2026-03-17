
"use client"  
import RecentActivities from "@/components/RecentActivities"
import { Button } from "@/components/ui/button"
import { Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransactionRegister } from "@/store/transactionRegister"
const Home = () => {
  const router = useRouter()
  const { items} = useTransactionRegister()
  const totalIncome = items.filter(item => item.type === 'income').reduce((acc, item) => acc + item.amount, 0)
  const totalExpenses = items.filter(item => item.type === 'expense').reduce((acc, item) => acc + item.amount, 0)
  const balance = totalIncome - totalExpenses
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start gap-4 px-4 md:px-8 pt-4 pb-20'>
      <div className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
        <div className='w-full flex flex-col items-center justify-center text-xl px-6 h-24 bg-accent rounded-xl'>
          Całkowity Przychód
          <div className='flex items-center gap-2 text-3xl font-bold'>
            <TrendingUp />
            {totalIncome.toFixed(2)} PLN
          </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center text-xl px-6 h-24 bg-primary rounded-xl'>
          Całkowite Koszty
          <div className='flex items-center gap-2 text-3xl font-bold'>
            <TrendingDown />
            {totalExpenses.toFixed(2)} PLN
          </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center text-xl px-6 h-24 bg-secondary rounded-xl'>
          Saldo
          <div className={`flex items-center gap-2 text-3xl font-bold ${balance < 0 ? 'text-red-700' : 'text-green-300'}`}>
            <Wallet />
            {balance.toFixed(2)} PLN
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-2  gap-4 '>
        <Button className=' flex items-center justify-center text-xl px-6 h-24 bg-accent rounded-xl cursor-pointer hover:bg-accent/80 transition-colors duration-200' onClick={() => router.push('/add-income')}>
          <Plus />
          Dodaj Dochód
        </Button>
        <Button className=' flex items-center justify-center text-xl px-6 h-24 bg-primary rounded-xl cursor-pointer hover:bg-primary/80 transition-colors duration-200' onClick={() => router.push('/add-expense')}>
          <Plus />
          Dodaj Koszt
        </Button>
      </div>
      <RecentActivities title="Ostatnie" end={5}/>
    </div>
  )
}

export default Home
