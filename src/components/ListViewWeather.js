import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {selectCity} from '../citySlice'
import humidityLogo from'../humidity.png';

const ListViewWeather = () =>{
    const citys = useSelector(state => state.citys.list)
    const dispatch = useDispatch()
    const [selectedCity, setSelectedCity] = useState(null)
    const [days, setDays] = useState({
        isLoaded:true,
        list:[],
        success:true,
        message:''
    })

    const headers = {
        'authorization': 'apikey 7IFX6N1fZYaatdx3RFl80G:3MbrXksTzbugD0vCWNVtx1',
        'content-type': 'application/json'
    }


    const onChangeCity = (e) =>{
        let id = e.target.options[e.target.selectedIndex].getAttribute('id')
        let selectedCity = citys.find(el=>el.id === id)

        setDays({...days, isLoaded:true})

        if(selectedCity)
            fetch(`https://api.collectapi.com/weather/getWeather?data.lang=en&data.city=${selectedCity.name}`, {headers})
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

                dispatch(selectCity({id}))
                setSelectedCity(selectedCity)
            })


    }
    
    
    return(
        <>
            <div className="px-5 pt-5">
                <label htmlFor="citys" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a city</label>
                <select id="citys" defaultValue={selectedCity ? selectCity.id : null} onChange={onChangeCity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={null}>Select an option</option>
                    {
                        citys.length > 0 &&
                        citys.map(el=>(
                            <option key={el.id} name={el.name} id={el.id} value={el.id} >{el.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="p-5">
                {
                    selectedCity ?
                    
                        (
                            days.isLoaded ?
                            
                            <div className="flex justify-center items-center h-full">
                                <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                    <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                    </svg>
                                    <span>Loading...</span>
                                </button> 
                            </div>
                        
                        :
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Day
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Degree
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Min
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Max
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Night
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Humidity
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        days.list.map(el=>(
                                            <tr key={el.date} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    {el.date}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {el.day.slice(0, 3)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {el.status + '        '} <img src={el.icon} width="20" height="20" className="inline" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {el.degree + ' '} <span>&#8451;</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {el.min + ' '} <span>&#8451;</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {el.max + ' '} <span>&#8451;</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {el.night + ' '} <span>&#8451;</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {el.humidity + '%'} <img src={humidityLogo} width="15" height="15" className="inline" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {el.description}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>)
                    :
                    <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                        <span className="font-medium">Info!</span> Please select a city
                    </div>
                }
            </div>
        </>
    )
}

export default ListViewWeather