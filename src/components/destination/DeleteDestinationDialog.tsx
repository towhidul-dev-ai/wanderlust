'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import React from 'react';
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteDestinationDialog = ({id}: {id: string}) => {
    const handleDeleteDestination = async ()=>{
      const res = await fetch(`http://localhost:8000/destination/${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      redirect('/destinations')
    }
    return (
        <div>
            <AlertDialog>
  <AlertDialogTrigger render={<Button
          type="button"
          variant="outline"
          className="border px-4 py-2 text-xs"
        >
          <Pencil className="mr-1 h-4 w-4" />
          Delete
        </Button>}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </div>
    );
};

export default DeleteDestinationDialog;