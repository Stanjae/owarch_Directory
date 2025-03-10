'use client'

import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const CClearBtn = ({options1, options2, options3}:{options1:string; options2:string; options3:string}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const { replace } = useRouter();

    const handleClear = () => {
        const params = new URLSearchParams(searchParams);
        params.delete(options1);
        params.delete(options2)
        params.delete(options3)
        replace(`${pathname}?${params.toString()}`);
    }

    const lop = searchParams.get(options1)?.toString() || searchParams.get(options2)?.toString() || searchParams.get(options3)?.toString()
  return (
    <Button disabled={!lop} variant={'secondary'} onClick={handleClear}>Clear <X/></Button>
  )
}

export default CClearBtn