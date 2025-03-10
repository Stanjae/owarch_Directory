'use client'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { PriestDetail } from '@/utils/definitions'
import Priest01 from '../../../public/priest.jpg'
import { urlFor } from '@/sanity/client'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ChurchIcon, PhoneCall } from 'lucide-react'
import { CHoverCard } from './CHoverCard'

export const CCard = ({item}:{item:PriestDetail}) => {
  const imgUrl = item?.thumbnail == null ? Priest01 : urlFor(item.thumbnail)?.width(700)?.height(700)?.url()
  return (
    <Card key={item?._id} className=' text-center'>
        <Image alt='source' width={700} height={500} className='w-full object-cover' src={imgUrl}/>
        <CardHeader className=' text-2xl font-bold'>{item?.fullname}</CardHeader> 
        <CardContent>
          <div className=' space-y-3  w-5/6 mx-auto'>
            <div className=' flex gap-5'>
            <PhoneCall/>
            <a href={`tel:${item?.phoneNumber}`}>{item?.phoneNumber}</a>
          </div>
          <div className=' flex gap-5'>
            <ChurchIcon/>
            <CHoverCard preview={item?.parish}/>
          </div>
          </div>
          
        </CardContent>
        <CardFooter className='justify-center'>
          <Button className=' bg-light-brown' asChild><Link href={`/priest/${item?._id}`}>Visit Profile</Link></Button>
        </CardFooter>
    </Card>
  )
}