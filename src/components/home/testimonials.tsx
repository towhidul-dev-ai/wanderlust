"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person2.png",
  },
];

// One page per testimonial, starting at that testimonial. Two full-width
// pages are seamless for embla's loop (each slide's sibling covers the
// viewport), and every page lays the cards out exactly like the design.
const pages = testimonials.map(
  (testimonial) =>
    [
      ...testimonials.slice(testimonials.indexOf(testimonial)),
      ...testimonials.slice(0, testimonials.indexOf(testimonial)),
    ] as typeof testimonials
);

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <article className="flex h-72 overflow-hidden rounded-sm border border-border bg-white">
      <div className="flex flex-1 flex-col justify-between p-7">
        <p className="text-sm leading-relaxed text-foreground md:text-[15px]">
          {testimonial.quote}
        </p>
        <footer className="mt-6">
          <p className="text-sm text-brand">
            <span aria-hidden>— </span>
            {testimonial.name}
          </p>
          <p className="pl-4 text-xs text-muted-foreground">
            {testimonial.location}
          </p>
        </footer>
      </div>
      <div className="relative w-32 shrink-0 sm:w-40 lg:w-44">
        <Image
          src={testimonial.photo}
          alt={testimonial.name}
          fill
          sizes="(min-width: 1024px) 176px, 160px"
          className="object-cover"
        />
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <Carousel
        opts={{ loop: true, align: "start", containScroll: false }}
        className="mx-auto max-w-7xl"
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl text-foreground md:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <CarouselPrevious
              size="icon"
              className="static size-11 text-foreground/70 hover:border-brand hover:text-brand"
            />
            <CarouselNext
              size="icon"
              className="static size-11 text-foreground/70 hover:border-brand hover:text-brand"
            />
          </div>
        </div>

        <CarouselContent className="mt-10 -ml-6">
          {pages.map((page, index) => (
            <CarouselItem key={index} className="pl-6">
              <div className="grid gap-6 md:grid-cols-2">
                {page.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
