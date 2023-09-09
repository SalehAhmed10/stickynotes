import connectMongoDB from "../../../libs/mongodb";
import Note from "../../../models/note";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Note.create({ title, description });

  return NextResponse.json({ message: "Note Created" }, { status: 201 });
}

export async function GET() {
  let status = "fetching notes";
  await connectMongoDB();
  const notes = await Note.find();
  if (notes.length > 0) {
    status = notes.length + " note found";
  } else if (notes.length === 0) {
    status = notes.length + " notes found";
  }

  return NextResponse.json({ notes, status }, { status: 200 });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Note.findByIdAndDelete(id);

  return NextResponse.json({ message: "Note Deleted" }, { status: 200 });
}
