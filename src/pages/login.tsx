import React from 'react'

const login = () => {
  return (
    <div className='w-full bg-slate-500 h-[100vh] flex flex-col justify-center items-center'>
        <div className='border-cyan-500 border-[4px] w-[30%] bg-slate-50 p-10 flex flex-col gap-4 rounded-xl'>
            <h1 className='text-5xl text-black text-center'>Login</h1>
            <form action="" className='flex flex-col gap-4 w-1/2 mx-auto &['>
                <input type="text" className="rounded-md px-3 py-1 border border-black" placeholder='Email'/>
                <input type="text" className="rounded-md px-3 py-1 border border-black" placeholder='Password'/>
                <button className='border border-black rounded-md self-center px-2 py-[3px]'>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default login