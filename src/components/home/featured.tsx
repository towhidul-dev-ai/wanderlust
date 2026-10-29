"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
};

const Featured = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch destinations: ${res.status}`);
        }

        const data = await res.json();

        // Support an array or an object containing destinations/data.
        const destinationList: Destination[] = Array.isArray(data)
          ? data
          : Array.isArray(data.destinations)
            ? data.destinations
            : Array.isArray(data.data)
              ? data.data
              : [];

        // Show only 5 destinations on the homepage.
        setDestinations(destinationList.slice(0, 5));
      } catch (err) {
        console.error("Featured destinations error:", err);
        setError("Unable to load destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector<HTMLElement>(".destination-card");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width + 16;

    slider.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector<HTMLElement>(".destination-card");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width + 16;
    const index = Math.round(slider.scrollLeft / cardWidth);

    setActiveIndex(
      Math.max(0, Math.min(index, destinations.length - 1))
    );
  };

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
              Featured Destinations
            </h2>

            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="flex shrink-0 items-center gap-3 border border-sky-400 px-4 py-3 text-[10px] font-medium uppercase tracking-wide text-sky-600 transition hover:bg-sky-500 hover:text-white"
          >
            All Destinations
            <span className="text-base">→</span>
          </Link>
        </div>

        {/* Loading placeholders: 5 */}
        {loading && (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-64 min-w-[85%] animate-pulse bg-gray-200 sm:min-w-[48%] lg:min-w-[32%]"
              />
            ))}
          </div>
        )}

        {/* Error message */}
        {!loading && error && (
          <p className="py-12 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* No destinations */}
        {!loading && !error && destinations.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No destinations available.
          </p>
        )}

        {/* Destination carousel */}
        {!loading && !error && destinations.length > 0 && (
          <>
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {destinations.map((destination) => (
                <article
                  key={destination._id}
                  className="destination-card w-[85%] min-w-[85%] shrink-0 snap-start sm:w-[48%] sm:min-w-[48%] lg:w-[32%] lg:min-w-[32%]"
                >
                  {/* Image */}
                  <Link
                    href={`/destinations/${destination._id}`}
                    className="group relative block h-[250px] overflow-hidden bg-gray-100"
                  >
                    {destination.imageUrl ? (
                      <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image available
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute right-3 top-3 bg-white/95 px-3 py-1.5 text-xs font-medium text-black">
                      {destination.rating ?? 4.5} ★
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="pt-4">
                    <p className="flex items-center gap-2 text-xs text-gray-500">
                      <span aria-hidden="true">⌖</span>
                      {destination.country}
                    </p>

                    <div className="mt-2 flex items-start justify-between gap-2">
                      <h3 className="text-lg font-medium text-black">
                        {destination.name}
                      </h3>

                      <p className="shrink-0 text-lg font-medium text-black">
                        {typeof destination.price === "number"
                          ? `$${destination.price}`
                          : destination.price}
                        <span className="text-[10px] font-normal text-gray-500">
                          /Person
                        </span>
                      </p>
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <span aria-hidden="true">▦</span>
                      {destination.duration}
                    </p>

                    <Link
                      href={`/destinations/${destination._id}`}
                      className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-sky-600 underline underline-offset-4 transition hover:text-sky-800"
                    >
                      Book Now
                      <span className="text-base no-underline">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Carousel footer */}
            <div className="mt-8 flex items-center gap-6">
              <p className="shrink-0 text-base font-medium text-black">
                {activeIndex + 1}/{destinations.length}
              </p>

              <div className="h-px flex-1 bg-gray-200">
                <div
                  className="h-px bg-sky-500 transition-all duration-300"
                  style={{
                    width: `${
                      ((activeIndex + 1) / destinations.length) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollSlider("left")}
                  disabled={activeIndex === 0}
                  aria-label="Previous destinations"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-sky-500 hover:text-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => scrollSlider("right")}
                  disabled={activeIndex >= destinations.length - 1}
                  aria-label="Next destinations"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-sky-500 hover:text-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Featured;

