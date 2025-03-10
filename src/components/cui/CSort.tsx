'use client'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowDownAZ, ArrowUpZA } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const CSort = () => {
        const searchParams = useSearchParams();
        const pathname = usePathname();
        const { replace } = useRouter();

     
        const handleSort =() =>{
            const params = new URLSearchParams(searchParams);
            if (searchParams.get('sort') === 'desc') {
                params.set('sort', 'asc');
            }else{
                params.set('sort', 'desc');
            }
            replace(`${pathname}?${params.toString()}`);
        }
  return (
    <Button variant={'ghost'} size={'lg'} className='text-background'  onClick={handleSort}>{searchParams.get('sort') === 'asc' ? <ArrowDownAZ className=' size-6'/>: <ArrowUpZA className=' size-6'/>}</Button>
  )
}

export default CSort