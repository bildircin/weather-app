import React from 'react'

const Day = ({day, date, selectDay, selectedDay, children}) =>{


    return(
       <>
        <div className={'day-title hover:bg-[#e7e7e7]' + (date === selectedDay.date ? ' bg-[#e7e7e7]' : '')} day={day} date={date} onClick={(e)=>{selectDay(e)}}>
            {
                children.slice(0, 3)
            }
        </div>
       </>
    )
}

export default Day