import React from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Atom, Biohazard, Eclipse, Leaf, Shell } from 'lucide-react'
import Link from 'next/link'
import { footerLinks } from '@/utils/navigation'

const socials = [{icon:<Leaf className=' size-4'/>}, {icon:<Biohazard className=' size-4'/>}, {icon:<Eclipse className=' size-4'/>}, 
    {icon:<Atom className=' size-4'/>},
     {icon:<Shell className=' size-4'/>}]
const CFooter = () => {
    
  return (
    <section className=' bg-dark-brown pt-[118px] pb-10 text-white'>
        <section className=' max-w-9xl space-y-10 mx-auto'>
                <main className='flex gap-10'>
                    <div className='grow'>
                        <h1 className=' text-[47px] leading-[47px] tracking-tight font-bold'>Welcome to Catholic<br/> Archdiocese, Owerri!</h1>
                    </div>

                    <div  className=' w-[320px] space-y-5'>
                        <h6 className=' font-bold text-lg'>Address</h6>
                        <p className=' text-[#cac2c0] text-wrap leading-[26.56px]'>Catholic Archdiocesan Secretariat —
                            <br/>Villa Assumpta,Owerri, Imo State, Nigeria</p>
                        <div className=' flex gap-2 items-center'>
                            {socials.map((i,j) => <Button className=' p-5 rounded-full bg-transparent' variant={'outline'} key={j}>{i.icon}</Button>)}
                        </div>
                    </div>

                    <div  className=' w-[303px] space-y-6'>
                        <h6 className=' font-bold text-[28px] leading-[36px]'>Ave Maria</h6>
                        <p className=' text-[#cac2c0] leading-[26.56px]'>ict@owarch.ng.org</p>

                        <div className=' gap-2 text-white font-medium text-lg flex items-center'>
                            <span className='text-[#cac2c0]'>ICTDS:</span>
                            <Link href='tel:08033306210'>+234 8033306210</Link>
                        </div>

                        <div className=' gap-2 flex-wrap text-white font-medium text-lg flex items-center'>
                            <span className='text-[#cac2c0]'>Maria Assumpta Cathedral Parish:</span>
                            <Link href='tel:+234 8034175402'>+234 8034175402</Link>
                        </div>

                        <div className=' gap-2 flex-wrap text-white font-medium text-lg flex items-center'>
                            <span className='text-[#cac2c0]'>Maria Assumpta Bookshop</span>
                            <Link href='tel:+234 8036738575'>+234 8036738575</Link>
                        </div>
                        
                    </div>

                </main>

                <Separator/>

                <section className=' flex justify-between items-center'>
                    <div className='text-[#cac2c0] flex gap-3'>
                        {footerLinks.map(link => <Link className=' text-xl' key={link.url} href={link.url}>{link.title}</Link>)}
                    </div>

                    <p className=' text-[#cac2c0] text-xl'>ICTDS-Owarch© 2025. All Rights Reserved. </p>
                </section>
        </section>
        
    </section>
  )
}

export default CFooter