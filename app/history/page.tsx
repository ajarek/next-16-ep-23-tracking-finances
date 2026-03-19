import RecentActivities from "@/components/RecentActivities"

const HistoryPage = () => {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start gap-4 px-4 md:px-8 pt-4 pb-20'>
      <RecentActivities title='Transakcje' end={undefined} />
    </div>
  )
}

export default HistoryPage
