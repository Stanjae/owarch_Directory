import { EmptyType } from "@/types/types";
import { Filter, Inbox, Search } from "lucide-react";

export const emptyStates = [
  {
    title: "No Results Found",
    message:
      "We couldn't find any matches for your search. Try adjusting your search terms or filters.",
    icon: Search,
    buttonText: "Clear Filters",
    buttonAction: () => {},
    buttonIcon: Filter,
    type: "search" as EmptyType
  },
  {
    title: "No Data Found",
    message: "There's nothing here yet. Start by adding some content.",
    icon: Inbox,
    type: "noData" as EmptyType
  },
];