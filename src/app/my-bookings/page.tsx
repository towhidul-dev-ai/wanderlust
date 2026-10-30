// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import BookingHistoryCard, {
//   type Booking,
// } from "@/components/booking/BookingHistoryCard";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";

// export default async function MyBookingsPage() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const user = session?.user;
//   const token = await getTokenFromClient();
//   if (!user?.email) {
//     return (
//       <main className="mx-auto max-w-6xl px-5 py-10">
//         <h1 className="text-3xl font-semibold">My Bookings</h1>
//         <p className="mt-3 text-gray-500">
//           Please sign in to view your bookings.
//         </p>
//       </main>
//     );
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(user.email)}`,
//     { cache: "no-store",
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//      }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch bookings");
//   }

//   const bookings: Booking[] = await res.json();

//   return (
//     <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8">
//       <h1 className="text-3xl font-normal text-gray-900 sm:text-4xl">
//         My Bookings
//       </h1>

//       <p className="mb-6 mt-2 text-sm text-gray-500">
//         Manage and view your upcoming travel plans
//       </p>

//       {bookings.length > 0 ? (
//         <div className="space-y-3">
//           {bookings.map((booking) => (
//             <BookingHistoryCard
//               key={booking._id}
//               booking={booking}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="border border-gray-200 px-5 py-12 text-center">
//           <h2 className="text-lg font-medium text-gray-800">
//             No bookings yet
//           </h2>
//           <p className="mt-2 text-sm text-gray-500">
//             Your travel plans will appear here.
//           </p>
//         </div>
//       )}
//     </main>
//   );
// }


import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingHistoryCard, {
  type Booking,
} from "@/components/booking/BookingHistoryCard";

export const dynamic = "force-dynamic";

export default async function MyBookingsPage() {
  const requestHeaders = await headers();

  // Get logged-in user
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-semibold">My Bookings</h1>
        <p className="mt-3 text-gray-500">
          Please sign in to view your bookings.
        </p>
      </main>
    );
  }

  // Get JWT token on the server
  const jwtToken = await auth.api.getToken({
    headers: requestHeaders,
  });

  const token = jwtToken?.token;

  if (!token) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-semibold">My Bookings</h1>
        <p className="mt-3 text-red-500">
          Authentication token not found. Please sign in again.
        </p>
      </main>
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  let bookings: Booking[] = [];

  try {
    const res = await fetch(
      `${apiUrl.replace(/\/+$/, "")}/my-bookings/${encodeURIComponent(
        user.email
      )}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseText = await res.text();

    if (!res.ok) {
      console.error("Bookings API error:", {
        status: res.status,
        response: responseText,
      });

      throw new Error(`Failed to fetch bookings: ${res.status}`);
    }

    const data: unknown = JSON.parse(responseText);

    if (!Array.isArray(data)) {
      throw new Error("Invalid bookings API response.");
    }

    bookings = data as Booking[];
  } catch (error) {
    console.error("My Bookings page error:", error);

    return (
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-semibold">My Bookings</h1>
        <p className="mt-3 text-red-500">
          Unable to load your bookings. Please try again.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8">
      <h1 className="text-3xl font-normal text-gray-900 sm:text-4xl">
        My Bookings
      </h1>

      <p className="mb-6 mt-2 text-sm text-gray-500">
        Manage and view your upcoming travel plans
      </p>

      {bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingHistoryCard
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 px-5 py-12 text-center">
          <h2 className="text-lg font-medium text-gray-800">
            No bookings yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your travel plans will appear here.
          </p>
        </div>
      )}
    </main>
  );
}

