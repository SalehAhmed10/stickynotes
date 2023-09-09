import React from "react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";

const getAllNotes = async () => {
  const apiUrl = process.env.API_URL;

  const res = await axios.get(`${apiUrl}/api/notes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.data;
  const status = await res.status;
  console.log(status);
  console.log(data);
  return { data };
};

export default async function ShowAllNotes() {
  interface Note {
    _id: string;
    title: string;
    description: string;
  }

  //   const { notes } = await getAllNotes();
  const { data } = await getAllNotes();
  //   console.log(data);

  // save the notes in the const as iterable array
  const notes = data.notes;
  //   console.log(notes);
  const status = data.status;
  console.log(status);

  return (
    <>
      {/* {notes?.length === 0 && (
        <div className="text-center text-2xl">No notes found..</div>
      )} */}
      <div className="text-center text-2xl"> {status}</div>

      {notes?.map((i) => (
        <div
          key={i._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{i.title}</h2>
            <div>{i.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={i._id} />

            <Link href={`/editNote/${i._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
