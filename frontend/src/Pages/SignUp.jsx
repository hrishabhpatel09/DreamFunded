import React from 'react'

const SignUp = () => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const fileReader = new FileReader();
        
        fileReader.onload = (event) => {
            console.log(event.target.result);
            console.log(file.type)
             // This will log the base64 URL of the file
        };
    
        fileReader.readAsDataURL(file);
    };
    
  return (
    <div className='grid place-content-center place-items-center h-[100vh] '>
      <div className='bg-white h-96 w-80 mb-36 shadow-md flex flex-col items-center rounded-sm'>
        <div className='bg-red-500 h-24 w-24 rounded-full flex justify-center items-center overflow-hidden'><img src={''} alt="user" /></div>
        <input type="file" className='' onChange={handleFileChange}/>
      </div>
    </div>
  )
}

export default SignUp
