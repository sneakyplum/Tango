"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HomePageLinks = () => {

  const router = useRouter();

  return (

    <div className='w-full h-full flex'>
      <header className="flex flex-row w-full justify-end items-end p-5 mr-5">
        <div className='flex w-1/5 justify-center gap-3'>

          <button onClick={() => router.push("sign-in")} className='bg-blue-600 p-3 text-white rounded-4xl flex w-full justify-center cursor-pointer text-lg'>
            Sign In
          </button>

          <button onClick={() => router.push("sign-up")} className='bg-blue-600 p-3 text-white rounded-4xl flex w-full justify-center cursor-pointer text-lg'>
            Sign Up
          </button>

          <button onClick={() => router.push("dashboard")} className='bg-blue-800 text-white rounded-2xl flex p-3 justify-center cursor-pointer w-full text-lg'>
            Dashboard
          </button>

        </div>
      </header>
    </div>
  )
}

export default HomePageLinks