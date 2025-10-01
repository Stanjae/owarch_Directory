"use client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPriests } from "@/lib/actions";
import { PriestDetail } from "@/utils/definitions";
import { CCard } from "./CCard";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import LogoLoader from "./LogoLoader";
import CErrorState from "./CErrorState";

const PriestsDirectory = () => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();

  const {
    status,
    data,
    refetch,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "priests",
      searchParams.get("query")?.toString(),
      searchParams.get("position")?.toString(),
      searchParams.get("title")?.toString(),
      searchParams.get("sort")?.toString(),
    ],
    queryFn: async ({
      pageParam,
    }): Promise<{
      data: Array<PriestDetail>;
      previousId: number;
      nextId: number;
    }> => {
      const response = await getPriests(
        pageParam,
        searchParams.get("query")?.toString(),
        searchParams.get("title")?.toString(),
        searchParams.get("position")?.toString(),
        searchParams.get("sort")?.toString()
      );
      return response;
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status == "error") {
    return <CErrorState onRetry={refetch} />;
  }

  return (
    <section className=" py-10">
      <div
        className={` max-w-8xl  mx-auto grid gap-10 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 `}
      >
        {data?.pages?.map((page) =>
          page?.data?.map((item) => <CCard key={item._id} item={item} />)
        )}
      </div>

      <div className="relative my-2 " ref={ref}>
        {!searchParams.get("query")?.toString() &&
        (isFetchingNextPage || hasNextPage || isFetching) ? (
          <LogoLoader />
        ) : searchParams.get("query")?.toString() &&
          data?.pages?.length === 0 ? (
          <Alert className="mx-auto max-w-3xl text-brown">
            <AlertCircleIcon className=" !size-6" />
            <AlertTitle className=" text-2xl">No Searches found</AlertTitle>
            <AlertDescription className=" text-lg">
              Try searching for something else
            </AlertDescription>
          </Alert>
        ) : (
          <div className=" px-2 py-1 bg-brown text-white rounded-xl italic mx-auto">
            Nothing more to load
          </div>
        )}
      </div>
    </section>
  );
};

export default PriestsDirectory;
