import React,{useRef,useMemo, useEffect, useState} from 'react'
import {io} from 'socket.io-client'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux';
import './ChatApp.css'
import MessageBox from '../Components/MessageBox.jsx';
import sampleAvatar from '../assets/images.png'
import { useLoaderData } from 'react-router-dom';
const ChatApp = () => {
  const result = useLoaderData()
  console.log(result)
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
      <div className='grid grid-cols-5 h-[100vh] gap-4 pt-4 dark:bg-[#1f1f1ff7]'>
        <div className='col-start-1 col-span-1 bg-white ml-2 rounded-lg dark:bg-[#1f1f1f] ' >
          <div className='h-20 flex items-center pl-2 gap-2 dark:text-white'>
            <img src={sampleAvatar} alt="user_img" className='rounded-[50%] h-16 w-16'/>
            <div><h2 className='font-semibold'>{user.username}</h2></div>
          </div>
          {result.data.data[0].groups.map((grp,idx)=>{
            return <MessageBox key={idx} username={grp.name}/>
          })}
        </div>
        <div className='bg-white col-span-4 rounded-md ml-1 chat-area'></div>
      </div>
    </>
  )
}

export default ChatApp
