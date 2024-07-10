import React from 'react'

const SenderBox = ({message, time}) => {
    const date = new Date(time);
    const options = {
        hour: '2-digit',
        minute: '2-digit'
      };
    const localTime = date.toLocaleTimeString(undefined, options);
  return (
    <div className='flex justify-end my-1 pr-1'>
      <span className='items-end bg-green-700 text-white h-8 rounded-2xl rounded-tr-[0] px-2 text-center'>{message}<sub className='text-[10px] pl-1'>{localTime}</sub></span>
    </div>
  )
}

export default SenderBox
