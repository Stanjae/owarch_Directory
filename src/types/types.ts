import { LucideProps } from "lucide-react";

export type EmptyType = "noData" | "search";

export type EmptyStateTypes = {
  title: string;
  message: string;
    type: EmptyType;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  buttonText?: string;
  buttonAction?: () => void;
  buttonIcon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};