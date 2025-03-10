'use client'
import { headerLinks } from '@/utils/navigation'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Slash } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'

const CBanner = () => {
    const heading = usePathname()

    const newHeading =heading == "/"? "Priests": "Parishes"


  return (
    <div className=' bg-light-overlay py-16'>
        <div className='text-center max-w-3xl mx-auto space-y-5'>
            <h1 className=' text-[57px] font-bold leading-[60px] '>{newHeading}</h1>
           
                <Breadcrumb>
                <BreadcrumbList className=' justify-center text-center'>
                    <BreadcrumbItem>
                    <BreadcrumbLink href={headerLinks[0].url}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbLink className=' capitalize' href={heading}>{newHeading}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>

        </div>
    </div>
  )
}

export default CBanner
