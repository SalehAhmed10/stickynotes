import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

type NoteType = {
  _id: string;
  title: string;
  description: string;
};

export default async function NotesList() {
  const apiUrl = process.env.API_URL;

  // call api .then setNotes to the response data (array of notes) .catch log error message save to variable dont use useState
  let notes: NoteType[] = [];
  try {
    const res = await fetch(`${apiUrl}/api/notes`, {
      cache: "no-cache",
    });
    const data = await res.json();

    if (res.ok) {
      notes = data.notes;
      console.log(notes);
    } else {
      throw new Error("Failed to fetch notes");
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      {notes?.length === 0 && (
        <div className="text-center text-2xl">No notes found..</div>
      )}
      {notes?.map((t) => (
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
      ))}
    </>
  );
}

// import Link from "next/link";
// import RemoveBtn from "./RemoveBtn";
// import { HiPencilAlt } from "react-icons/hi";

// const getTopics = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/notes", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };

// export default async function TopicsList() {
//   const { notes } = await getTopics();

//   return (
//     <>
//       {notes.map((t) => (
//         <div
//           key={t._id}
//           className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
//         >
//           <div>
//             <h2 className="font-bold text-2xl">{t.title}</h2>
//             <div>{t.description}</div>
//           </div>

//           <div className="flex gap-2">
//             <RemoveBtn id={t._id} />
//             <Link href={`/editNote/${t._id}`}>
//               <HiPencilAlt size={24} />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
