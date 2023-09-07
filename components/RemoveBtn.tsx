"use client";

import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import ToastNotification from "./ToastNotification";

export default function RemoveBtn({ id }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const removeNote = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });

      const { message } = await res.json();
      console.log(message);

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          router.refresh();
        }, 2000);
      }
    }
  };

  return (
    <>
      {isSuccess ? (
        <ToastNotification
          message="Note deleted successfully!"
          type="success"
        />
      ) : null}
      <button className="text-red-400" onClick={removeNote}>
        <HiTrash size={24} />
      </button>
    </>
  );
}
