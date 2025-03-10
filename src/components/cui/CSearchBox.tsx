import React from 'react'
import { Separator } from '../ui/separator';

const CSearchBox = ({search, options, sort, options2, clear}:
  {search:React.ReactNode; options:React.ReactNode; clear:React.ReactNode; options2:React.ReactNode; sort:React.ReactNode}) => {
  return (
    <section className='bg-dark-brown py-8'>
        <div className=' glassmorph p-4 flex justify-between items-center mx-auto max-w-8xl'>
            {search}

            <div className='flex gap-3 items-center'>
                <Separator  className='text-white bg-white' orientation="vertical" />
                <div className='flex gap-4 items-center'>
                    {options}
                    {options2}
                    {sort}
                    <div className=' w-[1px] h-10 bg-white'/>
                    {clear}
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default CSearchBox