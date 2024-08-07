import React from 'react'

function Navbar() {
    let currentDate = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekdayIndex = currentDate.getDay();
  
  return (
    <div className='bg-zinc-300 px-7 w-full py-1 flex justify-between items-center mb-12'>
        <div className='text-lg font-bold hover:bg-zinc-200 py-2 px-2 rounded-md'>ToDo Dash</div>
        <div className=' text-sm flex gap-8'>
            <div>{days[weekdayIndex]}</div>
            <div>{currentDate.toLocaleDateString()}</div>
            
        </div>
    </div>
  )
}

export default Navbar