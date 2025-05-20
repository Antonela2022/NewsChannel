
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("CloudComputing");

        const articles = await db
            .collection("savedArticles")
            .find({ userId: session.user.id })
            .sort({ savedAt: -1 })
            .toArray();

        const mapped = articles.map((a) => ({
            _id: a._id.toString(),
            title: a.title,
            description: a.description,
            url: a.url,
            urlToImage: a.urlToImage,
            source: a.source,
        }));

        res.status(200).json(mapped);
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ error: "Database error" });
    }
}
