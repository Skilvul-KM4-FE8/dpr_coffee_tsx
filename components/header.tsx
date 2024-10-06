import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { HeaderLogo } from "./header-logo"
import { Navigation } from "./header-navigation"
import { Loader2 } from "lucide-react"
import WelcomeMessage from "./header-welcome-message"

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-green-500 to-green-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl="/" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 size={32} className="text-white animate-spin" />
                    </ClerkLoading>
                </div>
                <WelcomeMessage />
            </div>
        </header>
    )
}