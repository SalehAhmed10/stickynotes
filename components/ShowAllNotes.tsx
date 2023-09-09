import React from "react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";

const getAllNotes = async () => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/notes`, {
      cache: "no-store",
    });

    const data = await res.json();

    const status = await res.status;
    console.log(status);
    console.log(data);
    const resMessage = data.resMessage;
    console.log(resMessage);

    if (res.ok) {
      return { data, resMessage, statusCode: status };
    } else {
      throw new Error("Failed to load notes");
    }
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function ShowAllNotes() {
  interface Note {
    _id: string;
    title: string;
    description: string;
  }

  //   const { notes } = await getAllNotes();
  // const { data: notes } = await getAllNotes();

  // console.log(notes);

  const { data, statusCode } = await getAllNotes();
  console.log(data);

  // save the notes in the const as iterable array
  const notes: Note[] = data.notes;
  //   console.log(notes);
  const resMessage = data.resMessage;
  console.log(resMessage);

  return (
    <>
      {resMessage} || {statusCode}
      {/* if status code is not equal 200 say Failed to  else .map notes */}
      {statusCode !== 200 ? (
        <div>Failed to load notes</div>
      ) : (
        notes?.map((t) => (
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

              <Link href={`/editNote/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      )}
      {/* {notes?.map((t) => (
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

            <Link href={`/editNote/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))} */}
    </>
  );
}
