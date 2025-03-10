import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/logo.png'
import { Button } from '../ui/button'
import NavBox from './NavBox'
import { SearchIcon, ShoppingBag } from 'lucide-react'

const NavBar = () => {
  return (
    <div className=' py-8 bg-background'>
      <nav className=' max-w-8xl flex items-center justify-between mx-auto'>
        <Image src={Logo} alt='logo' width={65} height={65}/>
        <NavBox/>
        <div className=' flex gap-4 items-center'>
            <Button size={'icon'} variant={'ghost'} className=' rounded-full'><ShoppingBag className='size-6'/></Button>
            <Button size={'icon'} variant={'ghost'} className=' rounded-full'><SearchIcon className='size-6'/></Button>
            <Button className='btn-light'>Donate</Button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
