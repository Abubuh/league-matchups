import Link from 'next/link'
import React from 'react'

const RoutingButton = ({text, url}: {text: string, url: string}) => {
  return (
    <Link href={url}>
        <button className='border-[2.3px] py-1 px-5 max-w-[150px] text-md rounded-md bg-gray-300 border-black'>
        {text}</button>
    </Link>
  )
}

export default RoutingButton