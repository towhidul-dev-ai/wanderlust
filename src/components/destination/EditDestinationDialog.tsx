"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PackageCheck, Pencil, X } from "lucide-react";
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
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Destination>({
    ...destination,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function update(field: keyof Destination, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      // Load the latest destination values whenever the dialog opens.
      setForm({ ...destination });
      setMessage("");
      setIsError(false);
    }
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
      const token = await getTokenFromClient()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
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
          `Server returned HTTP ${res.status} instead of JSON. Check your API URL and backend route.`
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update destination."
        );
      }

      const result = data.result ?? data;

      if (
        typeof result.matchedCount === "number" &&
        result.matchedCount === 0
      ) {
        throw new Error("Destination not found.");
      }

      setMessage("Destination updated successfully!");

      // Close the dialog after a short moment so the success
      // message can be seen. Refresh the page to fetch new data.
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 800);
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        variant="outline"
        className="border px-4 py-2 text-xs"
        onClick={() => handleOpenChange(true)}
      >
        <Pencil className="mr-1 h-4 w-4" />
        Edit
      </Button>

      <DialogContent className="max-h-[90vh] min-w-0 overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the travel package information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid gap-5">
            {/* Destination name */}
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

            {/* Country and category */}
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
                  onValueChange={(value) => {
                    if (value !== null) {
                      update("category", value);
                    }
                  }}
                  required
                >
                  <SelectTrigger
                    id="category"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {!categories.includes(form.category) &&
                      form.category && (
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

            {/* Price and duration */}
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

            {/* Departure date */}
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

            {/* Editable image URL */}
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

              {form.imageUrl && (
                <div className="mt-2">
                  <p className="mb-2 text-sm text-muted-foreground">
                    Image preview
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.imageUrl}
                    alt="Destination preview"
                    className="h-40 w-full rounded-lg border object-cover"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.visibility = "visible";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">
                Description
              </Label>
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

          {/* Success and error messages */}
          {message && (
            <p
              role="status"
              className={`mt-4 text-sm ${
                isError
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Form actions */}
          <div className="mt-6 flex justify-end gap-3">
           
              <Button
                type="button"
                variant="outline"
                disabled={loading}
              >
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
            

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
            >
              <PackageCheck className="mr-1 h-4 w-4" />
              {loading
                ? "Updating..."
                : "Update Travel Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
