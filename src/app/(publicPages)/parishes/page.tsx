import CClearBtn from '@/components/cui/CClearBtn'
import CSearchBar from '@/components/cui/CSearchBar'
import CSearchBox from '@/components/cui/CSearchBox'
import { CSelectInput } from '@/components/cui/CSelectInput'
import CSort from '@/components/cui/CSort'
import ParishDirectory from '@/components/cui/ParishDirectory'
import { ParishFilters, parishTypes } from '@/utils/navigation'
import React, { Suspense } from 'react'

const page = async() => {
  return (
    <main>
      <CSearchBox options={<CSelectInput param='deanary' width='w-[200px]' label='All Denaries' selectArray={ParishFilters}  
        placeHolder='Filter a Deanary'/>}
        options2={<CSelectInput param='type' width='w-[150px]' label='All Types' selectArray={parishTypes}  
        placeHolder='Select a Type'/>}
        search={<Suspense><CSearchBar placeholder='Search for a Parish'/></Suspense> }
        sort={<CSort/>}
        clear={<CClearBtn options1='type' options2='deanary' options3='sort'/>}
        />

      <Suspense><ParishDirectory/></Suspense>
    </main>

    
  )
}

export default page