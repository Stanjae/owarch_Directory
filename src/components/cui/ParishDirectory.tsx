'use client'
import { getParishes } from '@/lib/actions'
import { alphaBets } from '@/utils/navigation'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import SpinLoader from './SpinLoader'
import { ParishType } from '@/utils/definitions'
import { useSearchParams } from 'next/navigation'
import { CAlertBox } from './CAlertBox'
import Link from 'next/link'
import ParishCard from './ParishCard'


const ParishDirectory = () => {
    const searchParams = useSearchParams();

    const {data, error, isLoading} =useQuery({queryKey:['parishes', searchParams.get('query')?.toString(), 
        searchParams.get('deanary')?.toString(), searchParams.get('type')?.toString(), searchParams.get('sort')?.toString()],
        queryFn:async():Promise<ParishType[]>=> getParishes(searchParams.get('query')?.toString(), searchParams.get('deanary')?.toString(), searchParams.get('type')?.toString(), searchParams.get('sort')?.toString())
    })

    const [hash, setHash] = React.useState('');

   useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash.slice(1)); // Remove the '#' symbol
    }
  }, []);

  return (
    <main>
        <section className=' mx-auto max-w-8xl'>
                <div className=' p-2 flex justify-center gap-5'>
                    {alphaBets.map(alpha => <Button onClick={()=> setHash(alpha.title)} asChild className={` text-dbrown`} variant={hash == alpha.title ? "default":'outline'} key={alpha.value}>
                        <Link href={`#${alpha.title}`}>{alpha.title}</Link></Button>)}
                </div>
                <div className=' top-10 relative'>
                    {isLoading ? <SpinLoader/> : error && <CAlertBox/>}
                </div>
                <div>
                {alphaBets.map(alpha =>{
                    const isavailable = data?.find(data => data.title.startsWith(alpha.value))
                    return(isavailable && <div id={`${alpha.title}`} key={alpha.title}>
                        <h2 className=' text-3xl my-3 font-bold'>{alpha.title}</h2>
                        <div className=' space-y-4'>
                            {data?.filter(parish => parish.title[0] === alpha.value).map(parish =>
                                <ParishCard key={parish?._id} item={parish}/>
                            )}
                        </div>
                    </div>)
        })}

                </div>
        </section>
        
    </main>
  )
}

export default ParishDirectory