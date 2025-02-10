import Link from 'next/link'
import React from 'react'


const navItems = [
    {
        href: "/",
        name: "Home"
    },
    {
        href: "/donate",
        name: "Donate"
    },
    {
        href: "/withdraw",
        name: "Withdraw"
    },
]

function Header() {

  return (
    <div className='w-full bg-black h-[60px] flex justify-center items-center sticky top-0'>
    <nav className='w-[800px]'>
        <ul className='flex gap-6 justify-center items-center'>
            {
                navItems.map((item, index) =>(
                    <li key={index} className='text-white'>
                        <Link href={`${item.href}`}>
                         {item.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </nav>
    </div>
  )
}

export default Header;