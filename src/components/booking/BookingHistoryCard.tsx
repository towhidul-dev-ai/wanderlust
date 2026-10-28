"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Eye,
  MapPin,
  Trash2,
} from "lucide-react";

export type Booking = {
  _id: string;
  destinationId: string;
  destinationName: string;
  country?: string;
  imageUrl: string;
  price: string | number;
  departureDate: string;
  bookingDate?: string;
  status?: string;
};

type BookingHistoryCardProps = {
  booking: Booking;
};

export default function BookingHistoryCard({
  booking,
}: BookingHistoryCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:8000/booking/${booking._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      console.log("Cancel response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      if (data.deletedCount === 0) {
        throw new Error("Booking not found");
      }

      router.refresh();
    } catch (err) {
      console.error("Cancel booking error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const price = Number(booking.price);

  const departureDate = booking.departureDate
    ? new Date(booking.departureDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Not selected";

  return (
    <article className="border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Destination image */}
        <Link
          href={`/destinations/${booking.destinationId}`}
          className="relative block h-48 w-full shrink-0 overflow-hidden sm:h-[125px] sm:w-[210px]"
        >
          <Image
            src={booking.imageUrl || "/placeholder.png"}
            alt={booking.destinationName}
            fill
            sizes="(max-width: 640px) 100vw, 210px"
            className="object-cover"
          />
        </Link>

        {/* Booking details */}
        <div className="min-w-0 flex-1">
          <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            <CheckCircle2 size={13} />
            {booking.status || "Confirmed"}
          </span>

          <h2 className="text-xl font-semibold text-gray-900">
            {booking.destinationName}
          </h2>

          {booking.country && (
            <p className="mt-1 text-sm text-gray-500">
              {booking.country}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={15} />
            <span>Departure: {departureDate}</span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={14} />
            <span className="break-all">
              Booking ID: {booking._id}
            </span>
          </div>

          <p className="mt-3 text-xl font-bold text-cyan-600">
            $
            {Number.isFinite(price)
              ? price.toLocaleString("en-US")
              : booking.price}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:self-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="inline-flex items-center gap-1 border border-red-300 px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={14} />
            {loading ? "Cancelling..." : "Cancel"}
          </button>

          <Link
            href={`/destinations/${booking.destinationId}`}
            className="inline-flex items-center gap-1 bg-cyan-600 px-3 py-2 text-sm text-white transition hover:bg-cyan-700"
          >
            <Eye size={14} />
            View
          </Link>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </article>
  );
}
