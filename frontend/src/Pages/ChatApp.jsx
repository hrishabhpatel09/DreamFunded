import React,{useRef,useMemo, useEffect, useState} from 'react'
import {io} from 'socket.io-client'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux';

const ChatApp = () => {
  const Socket = useRef(null);
  const user = useSelector(state=>state.user)
  const initialise = useMemo(()=>{
    Socket.current = io("http://localhost:8000",{query: {username : user.username}})
  },[])
  const [onlineUser, setOnlineUser] = useState([])

  useEffect(()=>{
    initialise
  })
  useEffect(()=>{
    Socket.current.on("Online",(arr)=>{
      console.log(arr)
      setOnlineUser(arr);
    })
  })
  return (
    <>
      <Navbar/>
      <div className='grid grid-cols-5 h-[100vh] gap-4 pt-4'>
        <div className='col-start-1 col-span-1 bg-white ml-2 rounded-lg' >User List</div>
        <div className='bg-white col-span-4 rounded-md'>Message Area</div>
      </div>
    </>
  )
}

export default ChatApp
