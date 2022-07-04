import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () =>{
    const [navMenu, setNavMenu] = useState([
        {
            id:1,
            url:"/",
            name:"MainPage",
            isActive:true
        },
        {
            id:2,
            url:"/map-view-weather",
            name:"Map View weather",
            isActive:false
        },
        {
            id:3,
            url:"/list-view-weather",
            name:"List View weather",
            isActive:false
        },
    ])

    return(
        <div className='h-16 bg-slate-400'>
            <div className='flex align-middle'>
                {
                    navMenu.map(el => (
                        <NavLink className="px-2.5 py-5 no-underline" to={el.url} key={el.id} id={el.id}>{el.name}</NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default Header
