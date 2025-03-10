

import { Button } from "@/components/ui/button"
import {
  Dialog,

  DialogContent,
 
  DialogTrigger,
} from "@/components/ui/dialog"

import Image from "next/image"

export function CModal({src}:{src:string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className=" absolute left-1/2 top-1/2 -translate-1/2 " variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <Image className=" w-full object-cover" width={1000} height={750} src={src} alt="caption"/>
      </DialogContent>
    </Dialog>
  )
}
