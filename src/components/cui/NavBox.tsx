'use client'
import { headerLinks } from '@/utils/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavBox = () => {
    const pathname = usePathname()
  return (
    <div className=' flex items-center gap-5'>
            {headerLinks.map((navLink, index) => (
                <Link href={navLink.url} className={`${navLink.url == pathname ? 'text-light-brown':'text-cblack'} capitalize text-cblack text-lg hover:border-cblack hover:border-b-2 transition-all duration-500 `} key={index}>
                    {navLink.title}
                </Link>))}
        </div>
  )
}

export default NavBox
