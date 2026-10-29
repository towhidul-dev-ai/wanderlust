// import React from 'react';

// const AllDestinationsPage = async () => {
//     const res = await fetch('http://localhost:8000/destinations');
//     const data = await res.json();
//     console.log(data)
//     return (
//         <div>
//             AllDestinationsPage
//         </div>
//     );
// };

// export default AllDestinationsPage;


// import { Suspense } from "react";

// import { DestinationsGrid } from "@/components/destination/DestinationGrid";
// import type { IDestination } from "@/lib/destination";

// async function Destinations() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);
//   const data: IDestination[] = await res.json();

//   return <DestinationsGrid destinations={data} />;
// }

// function DestinationsSkeleton() {
//   return (
//     <section className="w-full bg-background px-6 py-12">
//       <div className="mx-auto max-w-7xl">
//         <div className="h-12 w-96 max-w-full animate-pulse rounded-md bg-muted" />
//         <div className="mt-4 h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />
//         <div className="mt-10 grid gap-4 sm:grid-cols-3">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <div
//               key={i}
//               className="h-8 animate-pulse rounded-lg border border-border bg-muted/50"
//             />
//           ))}
//         </div>
//         <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div
//               key={i}
//               className="h-72 animate-pulse rounded-sm border border-border bg-muted/50"
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function AllDestinationsPage() {
//   return (
//     <main>
//       <Suspense fallback={<DestinationsSkeleton />}>
//         <Destinations />
//       </Suspense>
//     </main>
//   );

// }


import { Suspense } from "react";

import { DestinationsGrid } from "@/components/destination/DestinationGrid";
import type { IDestination } from "@/lib/destination";

// Fetch destination data when the page is requested, not at build time.
export const dynamic = "force-dynamic";

async function Destinations() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing from your Vercel environment variables."
    );
  }

  const endpoint = `${apiUrl.replace(/\/+$/, "")}/destinations`;

  const res = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const responseText = await res.text();

  if (!res.ok) {
    throw new Error(
      `Destinations API failed (${res.status}): ${responseText.slice(0, 200)}`
    );
  }

  let data: IDestination[];

  try {
    data = JSON.parse(responseText);

    if (!Array.isArray(data)) {
      throw new Error("Expected an array of destinations.");
    }
  } catch {
    throw new Error(
      `The API did not return a JSON array. Response: ${responseText.slice(0, 200)}`
    );
  }

  return <DestinationsGrid destinations={data} />;
}

function DestinationsSkeleton() {
  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-12 w-96 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-4 h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-8 animate-pulse rounded-lg border border-border bg-muted/50"
            />
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-sm border border-border bg-muted/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AllDestinationsPage() {
  return (
    <main>
      <Suspense fallback={<DestinationsSkeleton />}>
        <Destinations />
      </Suspense>
    </main>
  );
}
