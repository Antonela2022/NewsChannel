import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const { article } = req.body;
  if (!article || !article.url) {
    return res.status(400).json({ error: "Missing article data" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("CloudComputing");

    const existing = await db.collection("savedArticles").findOne({
      url: article.url,
      userId: session.user.id,
    });

    if (existing) {
      return res.status(200).json({ message: "Article already saved", alreadySaved: true });
    }

    const saved = await db.collection("savedArticles").insertOne({
      ...article,
      userId: session.user.id,
      savedAt: new Date(),
    });

    return res.status(200).json({ message: "Article saved", alreadySaved: false, id: saved.insertedId });
  } catch (error) {
    console.error("Save error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
