import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Day from "./Day"
import {selectCity} from '../citySlice'
import humidityLogo from'../humidity.png';

const MapViewWeather = () =>{
    const citys = useSelector(state => state.citys.list)
    const dispatch = useDispatch()
    const [days, setDays] = useState({
        isLoaded:true,
        selectedDay:null,
        list:[],
        success:true,
        message:''
    })

    
    const headers = {
        'authorization': 'apikey 5ZXMYjE0UDxJFKnlnTqZyf:1ukEm48Xsryc7sBhnMPO8i',
        'content-type': 'application/json'
    }

    const cityHover = (e)=>{
        let name = e.target.getAttribute('name')
        let cityBounding = e.target.getBoundingClientRect()

        e.target.style.fill = "burlywood"

        let cityTitleShownContent = document.querySelector('.city-title-show-content')
        cityTitleShownContent.innerHTML = name
        cityTitleShownContent.style.left = cityBounding.left + cityBounding.width / 3 + 'px'
        cityTitleShownContent.style.top = cityBounding.top - 30 + 'px'
        cityTitleShownContent.style.padding = '1px 3px'
    }

    const cityUnhover = (e)=>{
        let isSelected = e.target.getAttribute('isselected') == 'true'

        if(!isSelected)
            e.target.style.fill = ""
    
        let cityTitleShownContent = document.querySelector('.city-title-show-content')
        cityTitleShownContent.innerHTML = ''
        cityTitleShownContent.style.padding = '0px'

    }
    
    const selectDay = (e) => {
        let date = e.target.getAttribute('date')

        setDays({
            ...days,
            selectedDay:{...days.list.find(el=>el.date === date)}
        })
    }
  
    const getWeather = (e) =>{

        setDays({...days, isLoaded:true})

        fetch(`https://api.collectapi.com/weather/getWeather?data.lang=en&data.city=${e.target.getAttribute('name')}`, {headers})
        .then(response => response.json())
        .then(data => {
            if(data.success)
                setDays({
                    ...days,
                    list:data.result,
                    //selectedDay: days.selectedDay ? data.result.find(el=>el.date === days.selectedDay.date) : data.result[0],
                    selectedDay: data.result.find(el=>el.date === (days.selectedDay != null ? days.selectedDay.date : {date:null})),
                    isLoaded:false,
                    success:true
                })
            else
                setDays({
                    ...days,
                    isLoaded:false,
                    success:false,
                    message:data.message
                })
                
            dispatch(selectCity({id:e.target.getAttribute('id')}))
            })
    }

    useEffect(()=>{
        setDays({...days, isLoaded:true})

        fetch(`https://api.collectapi.com/weather/getWeather?data.lang=en&data.city=aydin`, {headers})
        .then(response => response.json())
        .then(data => {
            if(data.success)
                setDays({
                    ...days,
                    list:data.result,
                    isLoaded:false,
                    success:true
                })
            else
                setDays({
                    ...days,
                    isLoaded:false,
                    success:false,
                    message:data.message
                })

            dispatch(selectCity({id:null}))
        })

    }, [])


   
    return(
        
        <>
            <div className="text-center p-5 pb-10">
                <h1 className="font-bold text-lg">Turkey Map Weather</h1>
            </div>
            <div className="p-5 grid md:grid-cols-3 grid-cols-1 gap-5">
                <div className="col-span-2 w-full">
                    <div className="city-title-show-content absolute bg-[#e7e7e7]"></div>
                    <svg className="w-full" baseProfile="tiny" fill="#7c7c7c" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" version="1.2" viewBox="0 0 1000 424" xmlns="http://www.w3.org/2000/svg">
                       {
                        citys.length > 0 &&
                        citys.map(el=>(
                            <path key={el.id} d={el.d} name={el.name} id={el.id} onMouseOver={cityHover} onMouseOut={cityUnhover} onClick={getWeather} isselected={el.isSelected + ''} style={el.isSelected ? {fill: 'burlywood'} : {}} ></path>
                        ))
                       }
                    </svg>
                </div>
                <div className="w-full px-5">
                    <div className="grid grid-cols-7 gap-1">
                    {
                        days.list.map(el =>(
                            <Day key={el.date} day={el.day} date={el.date} selectedDay={days.selectedDay ? days.selectedDay : {date:null}} selectDay={selectDay}>{el.day}</Day>
                        ))
                    }
                    </div>
                    
                    {days.isLoaded ? 
                        <div className="flex justify-center items-center h-full">
                            <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                {
                                    days.success ?
                                    <>
                                        <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                        </svg>
                                        <span>Loading...</span>
                                    </>
                                    :
                                    <span>{days.message}</span>
                                }
                                
                            </button> 
                        </div>
                    :
                   
                        days.success ?

                        (
                            citys.find(el=> el.isSelected === true) ?
                            (
                                days.selectedDay ? 
                                    <div className="grid grid-cols-2 gap-1 py-5">
                                        <div>Date</div><div>{days.selectedDay.date}</div>
                                        <div>Day</div><div>{days.selectedDay.day}</div>
                                        <div>Status</div><div>{days.selectedDay.status + '  '} <img src={days.selectedDay.icon} width="20" height="20" className="inline" /></div>
                                        <div>Degree</div><div>{days.selectedDay.degree + ' '} <span>&#8451;</span></div>
                                        <div>Min</div><div>{days.selectedDay.min + ' '} <span>&#8451;</span></div>
                                        <div>Max</div><div>{days.selectedDay.max + ' '} <span>&#8451;</span></div>
                                        <div>Night</div><div>{days.selectedDay.night + ' '} <span>&#8451;</span></div>
                                        <div>Humidity</div><div>{days.selectedDay.humidity + '%'} <img src={humidityLogo} width="15" height="15" className="inline" /></div>
                                        <div>Description</div><div>{days.selectedDay.description}</div>
                                    </div>
                                :
                                <div className="flex justify-center pt-10">
                                    <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                                        <span className="font-medium">Info!</span> Please select a day
                                    </div>
                                </div>
                            )
                        :
                            <div className="flex justify-center pt-10">
                                <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                                    <span className="font-medium">Info!</span> Please select a city
                                </div>
                            </div>
                        )

                        :
                        <div className="flex justify-center items-center h-full">
                            <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                <span>{days.message}</span>
                            </button> 
                        </div>
                    }
                       
                </div>
            </div>
        </>
    )
}

export default MapViewWeather