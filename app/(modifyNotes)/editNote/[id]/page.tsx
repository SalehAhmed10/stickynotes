import EditNoteForm from "@/components/EditNoteForm";

// export default function page({ params }: { params: params }) {
//   const { id } = params;

//   console.log(params);

const getTopicById = async (id) => {
  const apiUrl = process.env.API_URL;

  try {
    const res = await fetch(`${apiUrl}/api/notes/${id}`, {
      cache: "no-store",
      // alow CORS (Cross-Origin Resource Sharing)
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { note } = await getTopicById(id);
  const { title, description } = note;

  return <EditNoteForm id={id} title={title} description={description} />;
}
