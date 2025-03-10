'use client'
import React, { useEffect } from 'react'
import {useInView} from 'react-intersection-observer'
import SpinLoader from './SpinLoader'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPriests } from '@/lib/actions'
import { PriestDetail } from '@/utils/definitions'
import { CCard } from './CCard'
import { useSearchParams } from 'next/navigation'


const PriestsDirectory = () => {
    const { ref, inView } = useInView()
    const searchParams = useSearchParams();


    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
      } = useInfiniteQuery({
        queryKey: ['priests', searchParams.get('query')?.toString(), searchParams.get('position')?.toString(), searchParams.get('title')?.toString(), searchParams.get('sort')?.toString()],
        queryFn: async ({
          pageParam,
        }): Promise<{
          data: Array<PriestDetail>
          previousId: number
          nextId: number
        }> => {
          const response = await getPriests(pageParam, searchParams.get('query')?.toString(), searchParams.get('title')?.toString(), searchParams.get('position')?.toString(), searchParams.get('sort')?.toString());
          return response
        },
        initialPageParam: 1,
        getPreviousPageParam: (firstPage) => firstPage.previousId,
        getNextPageParam: (lastPage) => lastPage.nextId,
      })


      useEffect(() => {
        if (inView) {
          fetchNextPage()
        }
      }, [fetchNextPage, inView])

  return (
    <section className=' py-10'>
      <div className='mt-3 relative'>
          {status === 'pending' ? (
              <SpinLoader/>
            ) : status === 'error' ? (
              <span>Error: {error.message}</span>
            ):null}
      </div>

        <div className={` max-w-8xl  mx-auto grid gap-10 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 `}>
            {data?.pages?.map((page)=> (page?.data?.map((item)=> (<CCard key={item._id} item={item}/>))))}
        </div>



          <div className='relative bg-amber-500' ref={ref}>
              {isFetchingNextPage || hasNextPage || isFetching
                ? <SpinLoader/>
                  : 'Nothing more to load'}
          </div>
    </section>
  )
}

export default PriestsDirectory

/* import React from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { ref, inView } = useInView()

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: async ({
      pageParam,
    }): Promise<{
      data: Array<{ name: string; id: number }>
      previousId: number
      nextId: number
    }> => {
      const response = await fetch(`/api/projects?cursor=${pageParam}`)
      return await response.json()
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  })

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? 'Loading more...'
                : hasPreviousPage
                  ? 'Load Older'
                  : 'Nothing more to load'}
            </button>
          </div>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.data.map((project) => (
                <p
                  style={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    padding: '10rem 1rem',
                    background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={project.id}
                >
                  {project.name}
                </p>
              ))}
            </React.Fragment>
          ))}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load Newer'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
          </div>
        </>
      )}
      <hr />
      <Link href="/about">Go to another page</Link>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}
 */