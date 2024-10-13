import { Wallet } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import CountUp from 'react-countup';

type SummaryCardProps = {
    disabled: boolean;
    data: number ;
    title: string;
    tipe?: string
}

export const SummaryCard = ({disabled, data, title, tipe}:SummaryCardProps) => {
    return (
        <div className="rounded-md bg-white px-6 py-8 drop-shadow-md">
          <div className="flex justify-between">
            <div>
            <p className="font-bold text-xl">{title}</p>
            <p className="text-muted-foreground">October 2024 - Now</p>
            </div>
            <div className="flex justify-center items-center p-5 rounded-md bg-violet-300/30">
              <Wallet className="size-5 text-slate-800" />
            </div>
          </div>
          <div className="mt-4">
            {disabled ? (
              <Skeleton className="h-10 w-36" />
            ) : 
            (
            <div className="flex gap-x-2 items-center">
                {/* <p className="text-xl lg:text-2xl font-bold">{data} {tipe}</p> */}
                <CountUp className="text-xl font-bold" prefix={title === "Total Sale" ? "RP." : ""} end={data} duration={4} />
                <p>{tipe}</p>
            </div>
            )}
            {/* <p className="text-muted-foreground">2% From last period</p> */}
          </div>
        </div>
    )
}