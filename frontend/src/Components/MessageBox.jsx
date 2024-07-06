import React from 'react'
import user from '../assets/images.png'
const MessageBox = ({username, avatar, lastMessage}) => {
  return (
    <div className='h-16 my-1 pl-4 flex gap-2 hover:bg-slate-200 items-center  cursor-pointer dark:hover:dark:bg-[#525151db]'>
      <img src={avatar || user} alt="" className='h-12 w-12 rounded-full'/>
      <div>
        <h2 className='text-md text-gray-500 dark:text-white'>{username || "username"}</h2>
        <p className='text-sm text-gray-500'>{lastMessage|| "Last message"}</p>
      </div>
    </div>
  )
}

export default MessageBox
