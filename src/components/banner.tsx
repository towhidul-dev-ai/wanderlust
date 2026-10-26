import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", placeholder: "Adresse, City Or Z.p" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

function SearchBar() {
  return (
    <div className="grid grid-cols-1 bg-black/40 backdrop-blur-sm sm:grid-cols-2 md:grid-cols-[repeat(4,1fr)_auto]">
      {searchFields.map((field, index) => (
        <div
          key={field.label}
          className={
            index === 0
              ? "flex flex-col gap-0.5 border-white/25 px-6 py-2.5 sm:border-l-0"
              : "flex flex-col gap-0.5 border-l border-white/25 px-6 py-2.5"
          }
        >
          <span className="text-sm font-medium text-white">{field.label}</span>
          <input
            type="text"
            placeholder={field.placeholder}
            className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/70"
          />
        </div>
      ))}
      <Button className="h-auto w-full rounded-none px-9 py-2.5 text-sm font-medium sm:col-span-2 md:w-36 md:col-span-1">
        Search
      </Button>
    </div>
  );
}

export function Banner() {
  return (
    <section className="relative flex min-h-[600px] flex-col md:min-h-[calc(100svh-3.5rem)]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/30" />

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center">
        <h1 className="max-w-4xl font-heading text-5xl leading-tight text-white md:text-7xl">
          Discover Your <br /> Next Adventure
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <Button className="h-11 rounded-none px-7 text-sm font-medium tracking-wide">
            EXPLORE NOW
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="ghost"
            className="h-11 rounded-none bg-white/25 px-7 text-sm font-medium tracking-wide text-white hover:bg-white/35 hover:text-white"
          >
            VIEW DESTINATION
          </Button>
        </div>
      </div>

      <SearchBar />
    </section>
  );
}
