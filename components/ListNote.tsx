"use client";

import { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export default function ListNote() {
  const [notes, setNotes] = useState([]); // [] is the initial value

  const fetchData = async () => {
    const res = await fetch("/api/notes", {
      cache: "no-store",
    });
    const data = await res.json();

    if (res.ok) {
      setNotes(data.notes);
      console.log(data.notes);
    }

    fetchData();
  };

  return (
    <>
      <button
        onClick={() => {
          fetchData();
        }}
      >
        Fetch Data
      </button>

      {notes.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
