
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getParishDetail } from '@/lib/actions';
import { urlFor } from '@/sanity/client';
import { ParishType } from '@/utils/definitions';
import { CrossIcon, GalleryHorizontal } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
import PriestImage from '../../../../../public/priest.jpg'
import Link from 'next/link';
import { titleMade } from '@/utils/navigation';
import { CModal } from '@/components/cui/CModal';

const page = async({params,}: {params: Promise<{ slug: string }>}) => {
  const { slug } = await params;
  const response:ParishType = await getParishDetail(slug);

  const imgUrl = urlFor(response?.image)?.width(700)?.height(700)?.url();

  const positionLabel = response?.type == "parish" ? "Parish Priest" : response?.type == "chaplaincy" ? "Chaplain" : "Administrator";
  const postionValue = response?.parishPriest || response?.chaplain || response?.administrator;

  const asstPosition = response?.type == "parish" ? "Assistant Parish Priest" : response?.type == "chaplaincy" ? "Assistant Chaplain" : "Deputy Administrator";

  const parishPriestImage = postionValue?.thumbnail ? urlFor(postionValue?.thumbnail)?.width(100)?.height(100)?.url() : PriestImage

  const asstPriestImage = response?.asstParishPriest?.thumbnail ? urlFor(response?.asstParishPriest?.thumbnail)?.width(100)?.height(100)?.url() : PriestImage

  const residentPriestImage = response?.residentPriest?.thumbnail ? urlFor(response?.residentPriest?.thumbnail)?.width(100)?.height(100)?.url() : PriestImage

  const retiredPriestImage = response?.retiredPriest?.thumbnail ? urlFor(response?.retiredPriest?.thumbnail)?.width(100)?.height(100)?.url() : PriestImage


  const description = response?.description?.map(block => block.children.map(child => child.text).join('')).join('\n');

  return (
    <div className=' bg-dark-brown/5 py-10 h-dvh'>
      <section className='max-w-7xl flex items-start gap-5 mx-auto p-10'>
        <div className='p-3 space-y-3 bg-background rounded-3xl'>
           <Image className=' max-w-full object-cover rounded-2xl' width={350} height={250} src={imgUrl} alt="profile"/>
           <Separator/>
           <div>
            <h4 className=' text-xl font-semibold'>Dedicated On:</h4>
           </div>

           <div>
            <h4 className=' text-xl font-semibold'>Dedicated By:</h4>
           </div>
        </div>
        <div className='grow space-y-3'>
          <Card>
            <div className=' px-5 text-dbrown flex justify-between'>
              <h1 className=' text-3xl font-bold'>Church&apos;s Profile</h1>
              <CrossIcon className=' text-2xl'/>
            </div>
            <Separator/>
            <CardContent className=' space-y-2 px-5'>
              <div className=' text-xl gap-x-2 text-dark-brown font-medium flex items-center'>
                <span className='font-bold'>Parish Name:</span>
                <h2>{response?.title}</h2>
              </div>

              <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>Type:</span>
                <h2 className=' capitalize'>{response?.type?.replace("_", " ")}</h2>
              </div>

              <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>Deanary:</span>
                <Badge className='text-lg'>{response?.deanary}</Badge>
              </div>

              <Separator/>

              {postionValue && <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>{positionLabel}:</span>
                <Link href={`/priest/${postionValue?._id}`}>
                  <div className=' rounded-4xl gap-3 px-2 flex border border-dark-brown items-center'>
                    <Image src={parishPriestImage} alt="genuine" width={20} height={20}/>
                    {titleMade[postionValue?.title]} {postionValue?.fullname}
                  </div>
                </Link>
                
              </div>}

              {response?.asstParishPriest && <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>{asstPosition}:</span>
                <Link href={`/priest/${response?.asstParishPriest?._id}`}>
                  <div className=' rounded-4xl gap-3 px-2 flex border border-dark-brown items-center'>
                    <Image src={asstPriestImage} alt="genuine" width={20} height={20}/>
                    {titleMade[response?.asstParishPriest?.title]} {response?.asstParishPriest?.fullname}
                  </div>
                </Link>
              </div>}

              {response?.residentPriest && <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>{"Resident Priest"}:</span>
                <Link href={`/priest/${response?.residentPriest?._id}`}>
                  <div className=' rounded-4xl gap-3 px-2 flex border border-dark-brown items-center'>
                    <Image src={residentPriestImage} alt="genuine" width={20} height={20}/>
                    {titleMade[response?.residentPriest?.title]} {response?.residentPriest?.fullname}
                  </div>
                </Link>
              </div>}

              {response?.retiredPriest && <div className=' text-xl gap-x-2 text-dark-brown capitalize font-medium flex items-center'>
                <span className='font-bold'>{"Retired Priest"}:</span>
                <Link href={`/priest/${response?.retiredPriest?._id}`}>
                  <div className=' rounded-4xl gap-3 px-2 flex border border-dark-brown items-center'>
                    <Image src={retiredPriestImage} alt="genuine" width={20} height={20}/>
                    {titleMade[response?.retiredPriest?.title]} {response?.retiredPriest?.fullname}
                  </div>
                </Link>
              </div>}
            </CardContent>
          </Card>


          <Card>
            <div className=' px-5 text-dbrown flex justify-between'>
              <h1 className=' text-2xl font-bold'>Brief History & Description</h1>
              <CrossIcon className=' text-xl'/>
            </div>
            <CardContent className=' px-5'>{description}</CardContent>
          </Card>

          <Card>
            <div className=' px-5 text-dbrown flex justify-between'>
              <h1 className=' text-2xl font-bold'>Image Gallery</h1>
              <GalleryHorizontal className=' text-xl'/>
            </div>
            <CardContent className=' px5'>
              <div className=' flex gap-3 items-center'>
                {response?.images?.map((image, index) =>(
                  <div className=' relative' key={index}>
                    <Image width={250} height={150}  src={urlFor(image).url()} alt={image?._type}/>
                    <CModal src={urlFor(image).url()}/>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default page