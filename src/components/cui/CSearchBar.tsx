'use client'
import { SearchIcon } from 'lucide-react';
import React from 'react'
import { Input } from '../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const CSearchBar = ({placeholder}:{placeholder:string}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
  const { replace } = useRouter();
 
  const handleSearch = useDebouncedCallback((term: string) =>{
    const params = new URLSearchParams(searchParams);
    if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
    replace(`${pathname}?${params.toString()}`);

  },300)
     
    
  return (
    <div className="relative max-w-xl flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className=" text-background block w-full py-[9px] pl-10 text-sm placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}

export default CSearchBar
