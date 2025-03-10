import { CalendarIcon, Cross } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MiniParish } from "@/utils/definitions"
import Link from "next/link"
import { urlFor } from "@/sanity/client"

export function CHoverCard({preview}:{preview:MiniParish}) {
    const imgUrl = preview?.image == null ? "": urlFor(preview?.image).width(100).height(100).url()
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/parishes/${preview?.slug}`}>{preview?.title}</Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={imgUrl} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1 grow">
            <h4 className="text-sm text-left font-semibold">{preview?.title}</h4>
            <div className="text-sm capitalize space-x-1 flex font-medium items-center">
              <Cross className=" size-4 text-light-brown"/>:
              <p>{preview?.deanary} Deanary</p>
            </div>
            {preview?.dedicatedOn && <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Dedicated On : {preview?.dedicatedOn}
              </span>
            </div>}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
