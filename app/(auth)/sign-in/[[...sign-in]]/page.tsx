import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-screen">
        <div className="flex flex-col justify-center h-full w-full ">
          <h2 className="font-bold text-center text-slate-900 text-2xl lg:text-3xl">Welcome To Nextvul Cafe App</h2>
          <p className="text-muted-foreground text-center mb-3 mt-1">Please sign-in or sign-up to use this powerfull app</p>
          <div className="flex justify-center items-center pt-2">
            <ClerkLoaded>
              <SignIn path="/sign-in" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 size="32" className="animate-spin" />
            </ClerkLoading>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col gap-4 h-full w-full bg-blue-600 justify-center items-center">
          {/* <Image src="logo.svg" alt="" width={100} height={100} /> */}
          <h1 className="text-3xl font-sans text-white font-medium">Nextvul Cafe App</h1>
        </div>
      </div>
    </>
  );
}
