import CClearBtn from '@/components/cui/CClearBtn'
import CSearchBar from '@/components/cui/CSearchBar'
import CSearchBox from '@/components/cui/CSearchBox'
import { CSelectInput } from '@/components/cui/CSelectInput'
import CSort from '@/components/cui/CSort'
import PriestsDirectory from '@/components/cui/PriestsDirectory'
import { priestsFIlter, priestTitles } from '@/utils/navigation'
import React, { Suspense } from 'react'

const page = async() => {
  return (
    <main>
        <CSearchBox options={<CSelectInput param='position' width='w-[200px]' label='All Positions' selectArray={priestsFIlter}  
        placeHolder='Filter a Position'/>}
        options2={<CSelectInput param='title' width='w-[150px]' label='All Titles' selectArray={priestTitles}  
        placeHolder='Select a Title'/>}
        search={<Suspense><CSearchBar placeholder='Search for a Priest'/></Suspense> }
        sort={<CSort/>}
        clear={<CClearBtn options1='position' options3='sort' options2='title'/>}
        />

        <Suspense>
          <PriestsDirectory/>
        </Suspense> 
    </main>
  )
}

export default page
