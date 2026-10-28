// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { UserRound } from "lucide-react";
// import { cn } from "cn";
// import { authClient } from "@/lib/auth-client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverDescription,
//   PopoverHeader,
//   PopoverTitle,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Button } from "./ui/button";

// const navLinks = [
//   { label: "Home", href: "/", active: true },
//   { label: "Destinations", href: "/destinations" },
//   { label: "Add Destination", href: "/add-destination" },
//   { label: "My Bookings", href: "/my-bookings" },
//   { label: "Admin", href: "/admin" },
// ];

// const accountLinks = [
//   { label: "Login", href: "/login" },
//   { label: "Sign Up", href: "/signup" },
// ];

// export function Navbar() {
//   const {data: session} = authClient.useSession()

//   const user = session?.user;

//   const handleSignOut = () =>{
//     authClient.signOut();
//   }

//   // console.log(user)
//   return (
//     <header className="relative z-10 bg-white">
//       <div className="flex h-14 items-center justify-between px-6">
//         <nav className="flex items-center gap-6 text-sm">
//           {navLinks.map((link, index) => (
//             <div key={link.label} className="flex items-center gap-6">
//               {index === navLinks.length - 1 && (
//                 <span aria-hidden className="h-4 w-px bg-border" />
//               )}
//               <Link
//                 href={link.href}
//                 className={cn(
//                   "transition-colors hover:text-brand",
//                   link.active ? "font-medium text-brand" : "text-foreground"
//                 )}
//               >
//                 {link.label}
//               </Link>
//             </div>
//           ))}
//         </nav>

//         <Link
//           href="/"
//           className="absolute left-1/2 -translate-x-1/2"
//           aria-label="Wanderlast home"
//         >
//           <Image
//             src="/images/Wanderlast.png"
//             alt="Wanderlast"
//             width={162}
//             height={24}
//             priority
//           />
//         </Link>

//         <nav className="flex items-center gap-6 text-sm">
//           <Link
//             href="/profile"
//             className="flex items-center gap-1.5 text-foreground transition-colors hover:text-brand"
//           >
//             <UserRound className="size-3.5" />
//             Profile
//           </Link>
          
//          {
//           user ? <Popover>
//   <PopoverTrigger render={<Avatar><AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
//   <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
// </Avatar>}>
//   </PopoverTrigger>
//   <PopoverContent>
//     <PopoverHeader>
//       <PopoverTitle>{user?.name}</PopoverTitle>
//       <PopoverDescription><p>{user?.email}</p>
//       <Button onClick={handleSignOut} variant={'destructive'}>Signout</Button>
//       </PopoverDescription>

//     </PopoverHeader>
//   </PopoverContent>
// </Popover> : <>  {accountLinks.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               className="text-foreground transition-colors hover:text-brand"
//             >
//               {link.label}
//             </Link>
//           ))}
//           </>
//          }
  

        
//         </nav>
//       </div>
//     </header>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  UserRound,
  MapPin,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/", icon: MapPin },
  { label: "Destinations", href: "/destinations", icon: MapPin },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarDays },
  // { label: "Admin", href: "/admin", icon: ShieldCheck },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => setMobileOpen(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await authClient.signOut();
      closeMenu();
      router.push("/");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className="relative z-50 w-full px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8 lg:pt-5">
      <div className="relative mx-auto max-w-[1440px] border border-gray-100 bg-white shadow-sm">
        {/* Main navigation */}
        <div className="relative flex h-[58px] items-center justify-between px-4 sm:h-[62px] sm:px-6 lg:px-8">
          {/* Left navigation */}
          <nav className="hidden items-center gap-5 md:flex lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap text-xs transition-colors lg:text-sm",
                  isActive(link.href)
                    ? "font-medium text-cyan-600 underline underline-offset-4"
                    : "text-gray-800 hover:text-cyan-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Centered logo */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Wanderlast home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/Wanderlast.png"
              alt="Wanderlast"
              width={162}
              height={40}
              priority
              className="h-auto w-[125px] sm:w-[145px] lg:w-[162px]"
            />
          </Link>

          {/* Right account section */}
          <div className="ml-auto hidden items-center gap-4 md:flex lg:gap-6">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-800 transition hover:text-cyan-600 lg:text-sm"
                >
                  <UserRound size={14} />
                  Profile
                </Link>

                <Popover>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Open account menu"
                        className="flex items-center gap-1 rounded-full transition hover:opacity-80"
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={user.image ?? undefined}
                            alt={user.name ?? "User"}
                            referrerPolicy="no-referrer"
                          />
                          <AvatarFallback className="bg-cyan-50 text-cyan-700">
                            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown size={14} />
                      </button>
                    }
                  />
                  <PopoverContent align="end" className="w-60">
                    <PopoverHeader>
                      <PopoverTitle>{user.name ?? "My Account"}</PopoverTitle>
                      <p className="break-all text-sm text-gray-500">
                        {user.email}
                      </p>
                    </PopoverHeader>
                    <Button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      variant="destructive"
                      className="mt-3 w-full"
                    >
                      <LogOut size={15} />
                      {signingOut ? "Signing out..." : "Sign Out"}
                    </Button>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="whitespace-nowrap text-xs text-gray-800 transition hover:text-cyan-600 lg:text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="whitespace-nowrap text-xs text-gray-800 transition hover:text-cyan-600 lg:text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="ml-auto inline-flex size-9 items-center justify-center rounded-md text-gray-800 transition hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Responsive mobile navigation */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white md:hidden">
            <nav className="space-y-1 p-3">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 text-sm transition",
                      isActive(link.href)
                        ? "bg-cyan-50 font-medium text-cyan-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {/* <Icon size={17} /> */}
                    {link.label}
                  </Link>
                );
              })}

              <div className="my-2 border-t border-gray-100" />

              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name ?? "User"}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback className="bg-cyan-50 text-cyan-700">
                        {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {user.name ?? "User"}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm hover:bg-gray-50"
                  >
                    <UserRound size={17} />
                    Profile
                  </Link>

                  <Button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    variant="destructive"
                    className="mt-2 w-full"
                  >
                    <LogOut size={16} />
                    {signingOut ? "Signing out..." : "Sign Out"}
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="border border-gray-200 px-3 py-3 text-center text-sm hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="bg-cyan-600 px-3 py-3 text-center text-sm text-white hover:bg-cyan-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
