"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ToastNotification from "@/components/ToastNotification";

export default function AddNote() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  // const notify = () => toast("Wow so easy!");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    const { title, description } = formState;
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        // set is success to true for 2 seconds and then set it to false
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          router.push("/");
          router.refresh();
        }, 2000);
        // redirect to home page after 2 seconds
      } else {
        throw new Error("Failed to create a Note");
      }
    } catch (error) {
      //
    }
  };

  return (
    <section>
      {/*  */}
      {isSuccess ? (
        <ToastNotification message="Note added successfully!" type="success" />
      ) : null}

      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Note Title"
          className="border border-slate-500 px-8 py-2"
          onChange={(e) => {
            setFormState({ ...formState, title: e.target.value });
          }}
          value={formState.title}
        />

        <input
          type="text"
          placeholder="Note description"
          className="border border-slate-500 px-8 py-2"
          onChange={(e) => {
            setFormState({ ...formState, description: e.target.value });
          }}
          value={formState.description}
        />

        <button
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
          type="submit"
          onClick={handleSubmit}
        >
          Add Note
        </button>
      </form>
      {/* <button onClick={notify}>Notify!</button> */}
    </section>
  );
}
