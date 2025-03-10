'use client'
import React from 'react'
import { Card, CardContent,} from '../ui/card'
import Image from 'next/image'
import { ParishType } from '@/utils/definitions'
import { urlFor } from '@/sanity/client'
import {CrownIcon } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'

const ParishCard = ({item}:{item:ParishType}) => {
    const imgUrl = urlFor(item?.image)?.width(700)?.height(700)?.url();

    const position = item?.parishPriest ? "Parish Priest" : item?.administrator ? "Administrator" : "Chaplain";

    const newPriest = item?.parishPriest ? item?.parishPriest : item?.administrator ? item?.administrator : item?.chaplain
  return (
    <Card>
        <div className='flex gap-0.5 items-start'>
            <Image className=' object-cover' width={125} height={125} src={imgUrl} alt="parish" />
            <CardContent className=' grow'>
                <h1 className='capitalize hover:text-dbrown transition-all duration-500 text-2xl font-black tracking-wider'><Link href={`/parishes/${item?.slug}`}>{item?.title}</Link></h1>
                <div className=' capitalize text-lg flex space-x-1 items-center'>
                  <span className=' font-semibold'>Type :</span><Badge>{item?.type?.replace('_', ' ')}</Badge>
                </div>

                <div className=' capitalize text-lg flex space-x-1 items-center'>
                  <span className=' font-semibold'>Deanary :</span><p>{item?.deanary?.replace('_', ' ')}</p>
                </div>

                <div className=' capitalize text-lg flex space-x-1 items-center'>
                  <span className=' font-semibold'>{position} :</span><p>Rev Fr. {newPriest?.fullname}</p>
                </div>
                
            </CardContent>
            {item?.isHeadOfDeanary && <div className=' mr-5 flex items-center'>
              <Badge className=' text-sm bg-dark-brown'>Deanary Head</Badge>
                <CrownIcon className='text-amber-400'/>
            </div>}
        </div>
    </Card>
  )
}

export default ParishCard