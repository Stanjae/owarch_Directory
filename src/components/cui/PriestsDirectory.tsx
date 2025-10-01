"use client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPriests } from "@/lib/actions";
import { PriestDetail } from "@/utils/definitions";
import { CCard } from "./CCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogoLoader from "./LogoLoader";
import CErrorState from "./CErrorState";
import EmptyState from "./EmptyState";
import { EmptyStateTypes } from "@/types/types";
import { emptyStates } from "@/constants/emptyStates";

const PriestsDirectory = () => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const [empty, setEmpty] = React.useState<EmptyStateTypes | undefined>(
    undefined
  );

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

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("type");
    params.delete("query");
    params.delete("sort");
    params.delete("deanary");
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (
      searchParams.get("query")?.toString() &&
      data?.pages[0]?.data.length == 0
    ) {
      setEmpty({ ...emptyStates[0], buttonAction: handleClear });
      return;
    }

    if (data?.pages[0]?.data.length == 0) {
      setEmpty(emptyStates[1]);
      return;
    }
    setEmpty(undefined);
  }, [searchParams.get("query"), data]);

  if (searchParams.get("query")?.toString() && isFetching && !data) {
    return (
      <div className="my-2">
        <LogoLoader />
      </div>
    );
  }

  if (status == "error") {
    return <CErrorState onRetry={refetch} />;
  }

  return (
    <section className=" py-10">
      <EmptyState
        searchQuery={searchParams.get("query")?.toString()}
        empty={empty}
      />
      <div
        className={` max-w-8xl  mx-auto grid gap-10 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 `}
      >
        {data?.pages?.map((page) =>
          page?.data?.map((item) => <CCard key={item._id} item={item} />)
        )}
      </div>

      <div className="relative my-2 " ref={ref}>
        {!searchParams.get("query")?.toString() &&
          (isFetchingNextPage || hasNextPage || isFetching) && <LogoLoader />}
      </div>
    </section>
  );
};

export default PriestsDirectory;
