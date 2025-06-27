"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function CSelectInput({
  width,
  selectArray,
  label,
  param,
  placeHolder,
}: {
  width: string;
  label: string;
  param: string;
  placeHolder: string;
  selectArray: Array<{ title: string; value: string }>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [val, setVal] = useState(searchParams.get(param)?.toString());

  const handleSearch = useDebouncedCallback((term: string) => {
    setVal(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(param, term);
    } else {
      params.delete(param);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get(param)?.toString()) {
      setVal("");
    }
  }, [pathname, searchParams]);

  return (
    <Select value={val} onValueChange={handleSearch}>
      <SelectTrigger className={`${width} text-white`}>
        <SelectValue className="text-amber-50" placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {selectArray.map((item) => (
            <SelectItem key={item.title} value={item.value}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
