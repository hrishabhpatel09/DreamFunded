import React from 'react'
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  const user = useSelector(state=>state.user)
  const handleToggle = () => {
    const html =document.querySelector("html");
    html.classList.add("dark")
  }
  return (
    <div className='flex justify-around bg-white items-center dark:bg-black dark:text-white h-10'>
      <h2>Logo</h2>
      <div>
        <ul className='flex justify-center items-center gap-10'>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li>Add a Project</li>
          <li>My Projects</li>
          <li><NavLink to={'/chat'}>Chat</NavLink></li>
        </ul>
      </div>
      <div className='flex gap-3'>
        <button onClick={handleToggle}>Switch</button>
        <img src={user?.avatarImage} alt="profile img" className='h-8 rounded-[50%] w-8'/>
      </div>
    </div>
  )
}

export default Navbar
