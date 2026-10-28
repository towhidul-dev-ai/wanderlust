
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

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

type BookingCardProps = {
  destination: Destination;
};

export default function BookingCard({
  destination,
}: BookingCardProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [selectedDate, setSelectedDate] = useState(
    destination.departureDate || ""
  );

  const [message, setMessage] = useState("");

  const price = Number(destination.price);

  async function handleBooking(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      setMessage("Please sign in before booking.");
      return;
    }

    const bookingData = {
      username: user.name,
      email: user.email,
      image: user.image,
      destinationId: destination._id,
      destinationName: destination.name,
      country: destination.country,
      category: destination.category,
      price: destination.price,
      duration: destination.duration,
      imageUrl: destination.imageUrl,
      departureDate: selectedDate,
      bookingDate: new Date().toISOString(),
    };

    const res = await fetch('http://localhost:8000/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
     const data = await res.json()
     console.log(data)
    // console.log("Booking details:", bookingData);
    // setMessage("Booking details logged successfully.");
  }

  return (
    <aside className="h-fit border border-gray-100 p-3 shadow-md">
      <p className="text-xs text-gray-500">Starting from</p>

      <p className="text-2xl font-medium text-cyan-600">
        $
        {Number.isFinite(price)
          ? price.toLocaleString("en-US")
          : "—"}
      </p>

      <p className="text-xs text-gray-500">per person</p>

      <form onSubmit={handleBooking}>
        <label
          htmlFor="departure-date"
          className="sr-only"
        >
          Departure date
        </label>

        <input
          id="departure-date"
          name="departureDate"
          type="date"
          value={selectedDate}
          onChange={(event) =>
            setSelectedDate(event.target.value)
          }
          className="mt-7 w-full border border-gray-100 bg-gray-50 px-2 py-2 text-xs"
          required
        />

        <button
          type="submit"
          className="mt-3 flex w-full items-center justify-center gap-2 bg-cyan-600 py-3 text-xs text-white hover:bg-cyan-700"
        >
          Book Now →
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-gray-600" role="status">
          {message}
        </p>
      )}

      <ul className="mt-4 space-y-2 text-[10px] text-gray-500">
        <li>
          <span className="text-green-600">✓</span>{" "}
          Easy booking process
        </li>
        <li>
          <span className="text-green-600">✓</span>{" "}
          Destination details included
        </li>
        <li>
          <span className="text-green-600">✓</span>{" "}
          Travel information available
        </li>
      </ul>
    </aside>
  );
}




// "use client";

// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";

// type Destination = {
//   _id: string;
//   name: string;
//   country: string;
//   category: string;
//   price: string | number;
//   duration: string;
//   departureDate: string;
//   imageUrl: string;
//   description: string;
// };

// type BookingCardProps = {
//   destination: Destination;
// };

// export default function BookingCard({
//   destination,
// }: BookingCardProps) {
//     // console.log(destination)
//     const {data: session} = authClient.useSession()
    
//       const user = session?.user;

//       const handleBooking = async(e)=>{
//         e.preventDefault();
//         const departureDate = e.target.departureDate.value
//         const data = {
//             username: user?.name,
//             email: user?.email,
//             image: user?.email,
//             ...destination,
//             departureDate: departureDate,
//             bookingDate: new Date()
//         }
//         console.log(data)
//       }

//   const price = Number(destination.price);

//   const date = destination.departureDate
//     ? new Date(
//         `${destination.departureDate}T12:00:00`
//       ).toLocaleDateString("en-US", {
//         month: "2-digit",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : "";

//   return (
//     <aside className="h-fit border border-gray-100 p-3 shadow-md">
//       <p className="text-xs text-gray-500">Starting from</p>

//       <p className="text-2xl font-medium text-cyan-600">
//         $
//         {Number.isFinite(price)
//           ? price.toLocaleString("en-US")
//           : "—"}
//       </p>

//       <p className="text-xs text-gray-500">per person</p>

//       <label htmlFor="departure-date" className="sr-only">
//         Departure date
//       </label>

//       <form onSubmit={handleBooking}>

//       <input
//         id="departure-date"
//         type="date"
//         defaultValue={destination.departureDate || ""}
//         className="mt-7 w-full border border-gray-100 bg-gray-50 px-2 py-2 text-xs"
//       />

//       {/* {date && (
//         <p className="mt-2 text-xs text-gray-500">
//           Departure: {date}
//         </p>
//       )} */}

//       <Link
//         href={`/destinations/${destination._id}/book`}
//         className="mt-3 flex w-full items-center justify-center gap-2 bg-cyan-600 py-3 text-xs text-white hover:bg-cyan-700"
//       >
//         Book Now →
//       </Link>
//       </form>

//       <ul className="mt-4 space-y-2 text-[10px] text-gray-500">
//         <li>
//           <span className="text-green-600">✓</span>{" "}
//           Easy booking process
//         </li>
//         <li>
//           <span className="text-green-600">✓</span>{" "}
//           Destination details included
//         </li>
//         <li>
//           <span className="text-green-600">✓</span>{" "}
//           Travel information available
//         </li>
//       </ul>
//     </aside>
//   );
// }
