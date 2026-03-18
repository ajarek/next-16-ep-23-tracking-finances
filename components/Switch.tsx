const Switch = ({checked, onChange}: {checked: boolean, onChange: () => void}) => {
    
  return (
    <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" id="toggle" className="sr-only peer" checked={checked} onChange={onChange} />
  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium">{checked ? "Wyłącz powiadomienia" : "Włącz powiadomienia"}</span>
</label>
  )
}

export default Switch