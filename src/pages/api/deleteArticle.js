// pages/api/deleteArticle.js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "DELETE"){
     return res.status(405).end("Method Not Allowed");
  }
   
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Missing article ID" });

  try {
    const client = await clientPromise;
    const db = client.db("CloudComputing");

    const result = await db
      .collection("savedArticles")
      .deleteOne({ _id: new ObjectId(id), userId: session.user.id });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Article deleted" });
    } else {
      return res.status(404).json({ error: "Article not found" });
    }
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
