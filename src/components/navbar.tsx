"use client";
import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const {data: session} = authClient.useSession()

  const user = session?.user;

  const handleSignOut = () =>{
    authClient.signOut();
  }

  // console.log(user)
  return (
    <header className="relative z-10 bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        <nav className="flex items-center gap-6 text-sm">
          {navLinks.map((link, index) => (
            <div key={link.label} className="flex items-center gap-6">
              {index === navLinks.length - 1 && (
                <span aria-hidden className="h-4 w-px bg-border" />
              )}
              <Link
                href={link.href}
                className={cn(
                  "transition-colors hover:text-brand",
                  link.active ? "font-medium text-brand" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Wanderlast home"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-foreground transition-colors hover:text-brand"
          >
            <UserRound className="size-3.5" />
            Profile
          </Link>
          
         {
          user ? <Popover>
  <PopoverTrigger render={<Avatar><AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
</Avatar>}>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>{user?.name}</PopoverTitle>
      <PopoverDescription><p>{user?.email}</p>
      <Button onClick={handleSignOut} variant={'destructive'}>Signout</Button>
      </PopoverDescription>

    </PopoverHeader>
  </PopoverContent>
</Popover> : <>  {accountLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          </>
         }
  

        
        </nav>
      </div>
    </header>
  );
}
