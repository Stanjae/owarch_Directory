import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getPriestDetail } from '@/lib/actions'
import { urlFor } from '@/sanity/client'
import { PriestDetail } from '@/utils/definitions'
import { CrossIcon, } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PriestImage from '../../../../../public/priest.jpg'
import { titleMade } from '@/utils/navigation'

const page = async({params}: {params: Promise<{ uid: string }>}) => {
  const { uid } = await params;
  const response:PriestDetail = await getPriestDetail(uid);

  const imgUrl = response?.thumbnail ? urlFor(response?.thumbnail)?.width(700)?.height(700)?.url() : PriestImage;

  const description = response?.bio?.map(block => block.children.map(child => child.text).join('')).join('\n');
  return (
    <div className=' bg-dark-brown/5 py-10 h-dvh'>
      <section className='max-w-7xl flex items-start gap-5 mx-auto p-10'>
        <div className='p-3 space-y-3 bg-background rounded-3xl'>
           <Image className=' max-w-full object-cover rounded-full' width={350} height={250} src={imgUrl} alt="profile"/>
           <Separator/>
           <div>
            <h4 className=' text-xl font-semibold'>Ordained On:</h4>
           </div>

           <div>
            <h4 className=' text-xl font-semibold'>Ordained By:</h4>
           </div>
        </div>
        <div className='grow space-y-3'>
          <Card>
            <div className=' px-5 text-dbrown flex justify-between'>
              <h1 className=' text-3xl font-bold'>Priest&apos;s Profile</h1>
              <CrossIcon className=' text-2xl'/>
            </div>
            <Separator/>
            <CardContent className=' space-y-2 px-5'>
              <div className=' text-xl gap-x-2 text-dark-brown font-medium flex items-center'>
                <span className='font-bold'>Priest Name:</span>
                <h2>{titleMade[response?.title]} {response?.fullname}</h2>
              </div>

              <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>Email</span>
                <h2 className=' capitalize'>{response?.email}</h2>
              </div>

              <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>Phone Number:</span>
                <h2 className=' capitalize'>{response?.phoneNumber}</h2>
              </div>

              <Separator/>

              {response?.parish && <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>{"Parish"}:</span>
                <Link href={`/parishes/${response?.parish?.slug}`}>
                  <div className=' rounded-4xl gap-3 px-2 flex border border-dark-brown items-center'>
                    <Image src={urlFor(response?.parish?.image)?.url()} alt="genuine" width={20} height={20}/>
                    {response?.parish?.title}
                  </div>
                </Link>
                
              </div>}


              <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>{"Parish Position"}:</span>
                <h2 className=' capitalize'>{response?.position?.replace("_", " ")}</h2>
              </div>

            </CardContent>
          </Card>


          <Card>
            <div className=' px-5 text-dbrown flex justify-between'>
              <h1 className=' text-2xl font-bold'>Brief History & Description</h1>
              <CrossIcon className=' text-xl'/>
            </div>
            <CardContent className=' px-5'>{description}</CardContent>
          </Card>

        </div>
      </section>
    </div>
  )
}

export default page