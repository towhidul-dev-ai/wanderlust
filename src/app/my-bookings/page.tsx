import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingHistoryCard, {
  type Booking,
} from "@/components/booking/BookingHistoryCard";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
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

  const res = await fetch(
    `http://localhost:8000/my-bookings/${encodeURIComponent(user.email)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings: Booking[] = await res.json();

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
