import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NavButtonProps = {
    href: string;
    label: string;
}

export const NavButton = ({ href, label }: NavButtonProps) => {
    const pathName = usePathname()

    return (
        <>
            <Button
                asChild
                variant={"outline"}
                size="sm"
                className={cn(
                    "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition rounded-md",
                    pathName === href ? "bg-white/10 text-white" : "bg-transparent text-white"
                )}
            >
                <Link href={href}>{label}</Link>
            </Button>
        </>
    )
}