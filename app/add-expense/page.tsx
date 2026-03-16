import AddExpenseForm from '@/components/AddExpenseForm'

const AddExpensePage = () => {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start gap-4 p-4 md:p-8 '>
        <AddExpenseForm />
    </div>
  )
}

export default AddExpensePage