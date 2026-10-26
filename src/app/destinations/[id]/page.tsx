// import Image from 'next/image';
// import React from 'react';

// const DestinationDetailsPage = async ({params}) => {
//     const{id} = await params;

//     const res = await fetch(`http://localhost:8000/destination/${id}`);
//     const destination = await res.json();


//     console.log(destination)
//     return (
//         <div>
//             <div>
//                 <Image src={destination.imageURL}
//                 alt='' height={400} width={400}></Image>
//             </div>

//         </div>
//     );
// };

// export default DestinationDetailsPage;



import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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
};

async function getDestination(id: string): Promise<Destination | null> {
  try {
    const res = await fetch(
      `http://localhost:8000/destination/${id}`,
      { cache: "no-store" }
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch destination");

    return await res.json();
  } catch (error) {
    console.error("Destination fetch error:", error);
    throw error;
  }
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) notFound();

  const price = Number(destination.price);
  const date = new Date(destination.departureDate + "T12:00:00")
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-white px-5 py-5 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to Destinations
          </Link>

          <div className="flex gap-3">
            <Link
              href={`/destinations/${id}/edit`}
              className="border px-4 py-2 text-xs hover:bg-gray-50"
            >
              ✎ Edit
            </Link>

            <Link
              href="/destinations"
              className="border border-red-300 px-4 py-2 text-xs text-red-500 hover:bg-red-50"
            >
              ▤ Cancel
            </Link>
          </div>
        </div>

        <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-[312px]">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
            <section>
              <p className="text-xs text-gray-500">
                ♧ &nbsp;{destination.country}
              </p>

              <h1 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">
                {destination.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold text-green-600">
                  ★ 4.9
                </span>
                <span className="text-gray-500">(234 reviews)</span>
                <span>▦ &nbsp;{destination.duration}</span>
              </div>

              <h2 className="mt-7 text-xl font-medium">Overview</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                {destination.description}
              </p>

              <h2 className="mt-6 text-xl font-medium">Highlights</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Explore {destination.name} in {destination.country}.
                Enjoy the local scenery, discover memorable places, and
                experience the unique character of this destination.
              </p>

              <ul className="mt-4 grid gap-3 text-xs text-gray-500 sm:grid-cols-2">
                {[
                  "Explore local attractions",
                  "Discover beautiful scenery",
                  "Experience local culture",
                  "Create memorable experiences",
                  "Enjoy your travel itinerary",
                ].map((item) => (
                  <li key={item}>
                    <span className="mr-2 text-green-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <aside className="h-fit border border-gray-100 p-3 shadow-md">
              <p className="text-xs text-gray-500">Starting from</p>

              <p className="text-2xl font-medium text-cyan-600">
                ${Number.isFinite(price) ? price.toLocaleString("en-US") : "—"}
              </p>
              <p className="text-xs text-gray-500">per person</p>

              <label
                htmlFor="departure-date"
                className="sr-only"
              >
                Departure date
              </label>
              <input
                id="departure-date"
                type="date"
                defaultValue={destination.departureDate}
                className="mt-7 w-full border border-gray-100 bg-gray-50 px-2 py-2 text-xs"
                readOnly
              />

              <Link
                href={`/destinations/${id}/book`}
                className="mt-3 flex w-full items-center justify-center gap-2 bg-cyan-600 py-3 text-xs text-white hover:bg-cyan-700"
              >
                Book Now →
              </Link>

              <ul className="mt-4 space-y-2 text-[10px] text-gray-500">
                <li><span className="text-green-600">✓</span> Easy booking process</li>
                <li><span className="text-green-600">✓</span> Destination details included</li>
                <li><span className="text-green-600">✓</span> Travel information available</li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
