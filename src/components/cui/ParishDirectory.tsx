"use client";
import { getParishes } from "@/lib/actions";
import { alphaBets } from "@/utils/navigation";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ParishType } from "@/utils/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ParishCard from "./ParishCard";
import LogoLoader from "./LogoLoader";
import CErrorState from "./CErrorState";
import { EmptyStateTypes } from "@/types/types";
import EmptyState from "./EmptyState";
import { emptyStates } from "@/constants/emptyStates";

const ParishDirectory = () => {
    const searchParams = useSearchParams();
      const pathname = usePathname();
      const { replace } = useRouter();
     const [empty, setEmpty] = React.useState<EmptyStateTypes | undefined>(
        undefined
      );

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "parishes",
      searchParams.get("query")?.toString(),
      searchParams.get("deanary")?.toString(),
      searchParams.get("type")?.toString(),
      searchParams.get("sort")?.toString(),
    ],
    queryFn: async (): Promise<ParishType[]> =>
      getParishes(
        searchParams.get("query")?.toString(),
        searchParams.get("deanary")?.toString(),
        searchParams.get("type")?.toString(),
        searchParams.get("sort")?.toString()
      ),
  });

    const [hash, setHash] = React.useState("");
    
      const handleClear = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("type");
        params.delete("query");
        params.delete("sort");
        params.delete("deanary");
        replace(`${pathname}?${params.toString()}`);
      };


  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash.slice(1)); // Remove the '#' symbol
    }
  }, []);
    
      useEffect(() => {
        if (
          searchParams.get("query")?.toString() &&
          data?.length == 0
        ) {
          setEmpty({ ...emptyStates[0], buttonAction: handleClear });
          return;
        }
    
        if (data?.length == 0) {
          setEmpty(emptyStates[1]);
          return;
        }
        setEmpty(undefined);
      }, [searchParams.get("query"), data]);

  return (
    <main>
          <section className=" mx-auto max-w-8xl">
                <EmptyState
                      searchQuery={searchParams.get("query")?.toString()}
                      empty={empty}
                    />
        <div className=" p-2 flex  gap-4 items-center flex-wrap">
          {alphaBets.map((alpha) => (
            <Button
              onClick={() => setHash(alpha.title)}
              asChild
              className={` text-dbrown`}
              variant={hash == alpha.title ? "default" : "outline"}
              key={alpha.value}
            >
              <Link href={`#${alpha.title}`}>{alpha.title}</Link>
            </Button>
          ))}
        </div>
        <div className=" my-10 relative">
          {isLoading && <LogoLoader />}
          {error && <CErrorState onRetry={refetch} />}
        </div>
        <div>
          {alphaBets.map((alpha) => {
            const isAvailable = data?.filter(
              (parish) => parish.title[0] === alpha.value
            );
            return (
              (isAvailable?.length as number) > 0 && (
                <div id={`${alpha.title}`} key={alpha.title}>
                  <h2 className=" text-3xl my-3 font-bold">{alpha.title}</h2>
                  <div className=" space-y-4">
                    {isAvailable?.map((parish) => (
                      <ParishCard key={parish?._id} item={parish} />
                    ))}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ParishDirectory;
