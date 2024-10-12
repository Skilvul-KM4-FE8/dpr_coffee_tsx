"use client"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useMedia } from "react-use"
import { NavButton } from "./header-navbutton"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

const routes = [
    {
        href: "/",
        label: "Menu",
    },
    {
        href: "/transaction",
        label: "Transaction",
    },
    {
        href: "/overview",
        label: "Overview",
    },
    {
        href: "/managemenu",
        label: "Manage Menu",
    },
    {
        href: "/managetransaction",
        label: "Manage Transaction",
    },
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()
    const pathName = usePathname()
    const isMobile = useMedia("(max-width: 1024px)", false)

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    if (isMobile) {
        return (
            <>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                        >
                            <Menu className="size-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="px-2">
                        <nav className="flex flex-col items-start gap-y-2 pt-6">
                            {routes.map(route => (
                                <Button 
                                    key={route.href}
                                    variant={pathName === route.href ? "secondary" : "ghost"}
                                    onClick={() => onClick(route.href)}
                                >
                                    {route.label}
                                </Button>
                            ))}
                        </nav>

                    </SheetContent>
                </Sheet>
            </>
        )
    }

    return (
        <>
            <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
                {routes.map(route => (
                    <NavButton
                        key={route.href}
                        label={route.label}
                        href={route.href}
                    />
                ))}
            </nav>
        </>
    )
}