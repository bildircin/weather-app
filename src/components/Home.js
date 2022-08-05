import { useEffect, useState } from "react"
import humidityLogo from'../humidity.png';

const Home = () =>{
    const [day, setDay] = useState({
        dayObject:null,
        isLoaded:true,
        success:false,
        message:'',
        city:'',
        country:''
    })

    const headers = {
        'authorization': 'apikey 7IFX6N1fZYaatdx3RFl80G:3MbrXksTzbugD0vCWNVtx1',
        'content-type': 'application/json'
    }

    useEffect(()=>{
        let cityName = ''
        let countryName = ''

        setDay({...day, isLoaded:true})


        fetch('https://geolocation-db.com/json/geoip.php')
        .then(response => response.json())
        .then(data => {
            cityName = data.city
            countryName = data.country_name


            fetch(`https://api.collectapi.com/weather/getWeather?data.lang=en&data.city=${cityName}`, {headers})
            .then(response => response.json())
            .then(data => {
                if(data.success)
                    setDay({
                        ...day,
                        dayObject:data.result[0],
                        isLoaded:false,
                        success:true,
                        city:cityName,
                        country:countryName
                    })
                else
                    setDay({
                        ...day,
                        isLoaded:false,
                        success:false,
                        message:data.message
                    })
            })
        })
    }, [])

    return(
        <>
        {
            day.dayObject ?

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-[#e7e7e7]">
                    <div className="col-span-1">
                        <div className="p-10">
                             <img src={day.dayObject.icon} width="250" height="250" />
                            <span className="float-right mt-5 font-semibold">{day.dayObject.status + ' ' + day.city + '/' + day.country}</span>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 py-20 px-10">
                            <div className="col-span-1">Date</div><div className="col-span-1 md:col-span-2">{day.dayObject.date}</div>
                            <div className="col-span-1">Day</div><div className="col-span-1 md:col-span-2">{day.dayObject.day}</div>
                            <div className="col-span-1">Degree</div><div className="col-span-1 md:col-span-2">{day.dayObject.degree + ' '} <span>&#8451;</span></div>
                            <div className="col-span-1">Min</div><div className="col-span-1 md:col-span-2">{day.dayObject.min + ' '} <span>&#8451;</span></div>
                            <div className="col-span-1">Max</div><div className="col-span-1 md:col-span-2">{day.dayObject.max + ' '} <span>&#8451;</span></div>
                            <div className="col-span-1">Night</div><div className="col-span-1 md:col-span-2">{day.dayObject.night + ' '} <span>&#8451;</span></div>
                            <div className="col-span-1">Humidity</div><div className="col-span-1 md:col-span-2">{day.dayObject.humidity + '%'} <img src={humidityLogo} width="15" height="15" className="inline" /></div>
                            <div className="col-span-1">Description</div><div className="col-span-1 md:col-span-2">{day.dayObject.description}</div>
                        </div>
                    </div>
                    
                </div>
            :
            <div className="mt-20">
                <div className="flex justify-center items-center h-full">
                    <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                        <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                        </svg>
                        <span>Loading...</span>
                    </button> 
                </div>
            </div>
        }
        </>
    )
}

export default Home