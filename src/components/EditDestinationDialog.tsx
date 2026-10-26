// 'use client';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// ;
// import Link from "next/link";
// import { useState } from "react";
// import { PackageCheck, Trash2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

// // const initialForm = {
// //   name: "",
// //   country: "",
// //   category: "",
// //   price: "",
// //   duration: "",
// //   departureDate: "",
// //   imageUrl: "",
// //   description: "",
// // };


// import React from 'react';

// const EditDestinationDialog = ({destination}) => {
//     console.log(destination)
//     const [form, setForm] = useState(destination);
    
//       const update = (field: keyof typeof form, value: string) =>
//         setForm((current) => ({ ...current, [field]: value }));
    
//       const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         const { _id, ...updatedData} = form
    
//         const res = await fetch(`http://localhost:8000/${destination._id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedData)
//         })
    
//         const data =await res.json()
//         console.log(data)
        
//       };
//     return (
//         <Dialog>
//   <DialogTrigger><Button
//             //   href={`/destinations/${id}/edit`}
//               className="border px-4 py-2 text-xs hover:bg-gray-50"
//             >
//               ✎ Edit
//             </Button></DialogTrigger>
//   <DialogContent className={'min-w-xl'}>
//     <DialogHeader>
//       <DialogTitle>Edit Destination</DialogTitle>
//       <DialogDescription>
//          <form
//           onSubmit={handleSubmit}
//           className="mt-10 rounded-sm border border-border bg-white p-8 shadow-sm"
//         >
//           <div className="grid gap-5">
//             {/* Destination Name */}
//             <div className="grid gap-2">
//               <Label htmlFor="name">Destination Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Bali Paradise"
//                 value={form.name}
//                 onChange={(event) => update("name", event.target.value)}
//                 required
//               />
//             </div>

//             {/* Country + Category */}
//             <div className="grid gap-5 sm:grid-cols-2">
//               <div className="grid gap-2">
//                 <Label htmlFor="country">Country</Label>
//                 <Input
//                   id="country"
//                   placeholder="Indonesia"
//                   value={form.country}
//                   onChange={(event) => update("country", event.target.value)}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label>Category</Label>
//                 <Select
//                   value={form.category}
//                   onValueChange={(value) => update("category", value ?? "")}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Beach" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Price + Duration */}
//             <div className="grid gap-5 sm:grid-cols-2">
//               <div className="grid gap-2">
//                 <Label htmlFor="price">Price (USD)</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   placeholder="e.g., 1299"
//                   value={form.price}
//                   onChange={(event) => update("price", event.target.value)}
//                   required
//                   min="0"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="duration">Duration</Label>
//                 <Input
//                   id="duration"
//                   placeholder="e.g., 7 Days/6 Nights"
//                   value={form.duration}
//                   onChange={(event) => update("duration", event.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Departure Date */}
//             <div className="grid gap-2">
//               <Label htmlFor="departureDate">Departure Date</Label>
//               <Input
//                 id="departureDate"
//                 type="date"
//                 value={form.departureDate}
//                 onChange={(event) =>
//                   update("departureDate", event.target.value)
//                 }
//                 required
//               />
//             </div>

//             {/* Image URL */}
//             <div className="grid gap-2">
//               <Label htmlFor="imageUrl">Image URL</Label>
//               <Input
//                 id="imageUrl"
//                 type="url"
//                 placeholder="https://example.com/image.jpg"
//                 value={form.imageUrl}
//                 onChange={(event) => update("imageUrl", event.target.value)}
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className="grid gap-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 placeholder="Describe the travel experience..."
//                 className="min-h-36"
//                 value={form.description}
//                 onChange={(event) => update("description", event.target.value)}
//                 required
//               />
//             </div>
//           </div>

    

//           {/* Actions */}
//           <div className="mt-8 flex justify-end gap-3">
//             <Button
//               type="button"
//               variant="outline"
//               className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
//             >
//               <Trash2 />
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
//             >
//               <PackageCheck />
//               Edit Travel Package
//             </Button>
//           </div>
//         </form>
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>
//     );
// };

// export default EditDestinationDialog;


"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PackageCheck, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
];

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

type EditDestinationDialogProps = {
  destination: Destination;
};

export default function EditDestinationDialog({
  destination,
}: EditDestinationDialogProps) {
  const [form, setForm] = useState<Destination>({ ...destination });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
 

  function update(
    field: keyof Destination,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const { _id, ...updatedData } = form;

      const res = await fetch(
        `http://localhost:8000/destination/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedData,
            price: String(updatedData.price),
          }),
        }
      );

      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `The server returned HTTP ${res.status} instead of JSON. Check the API URL and backend route.`
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update destination."
        );
      }

      const result = data.result ?? data;

      if (result.matchedCount === 0) {
        throw new Error("Destination not found.");
      }

      setMessage("Destination updated successfully!");
    } catch (error) {
      console.error("Update destination error:", error);

      setIsError(true);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="border px-4 py-2 text-xs"
        >
          <Pencil className="mr-1 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] min-w-0 overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the travel package information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) =>
                  update("name", event.target.value)
                }
                placeholder="Bali Paradise"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(event) =>
                    update("country", event.target.value)
                  }
                  placeholder="Indonesia"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>

                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    update("category", value)
                  }
                  required
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {!categories.includes(form.category) && (
                      <SelectItem value={form.category}>
                        {form.category}
                      </SelectItem>
                    )}

                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(event) =>
                    update("price", event.target.value)
                  }
                  placeholder="e.g., 1299"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={form.duration}
                  onChange={(event) =>
                    update("duration", event.target.value)
                  }
                  placeholder="7 Days/6 Nights"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="departureDate">
                Departure Date
              </Label>
              <Input
                id="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  update("departureDate", event.target.value)
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(event) =>
                  update("imageUrl", event.target.value)
                }
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(event) =>
                  update("description", event.target.value)
                }
                placeholder="Describe the travel experience..."
                className="min-h-28"
                required
              />
            </div>
          </div>

          {message && (
            <p
              role="status"
              className={`mt-4 text-sm ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                <Trash2 className="mr-1 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
            >
              <PackageCheck className="mr-1 h-4 w-4" />
              {loading ? "Updating..." : "Edit Travel Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
