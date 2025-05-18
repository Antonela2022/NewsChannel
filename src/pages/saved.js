import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import clientPromise from "../../lib/mongodb";
import Header from "../../components/Header";
import SavedNews from "../../components/SavedNewsCard";

export default function Saved({ savedArticles }) {
  return (
    <>
      <Header />
      <SavedNews savedArticles={savedArticles} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db("CloudComputing");
    const articles = await db
      .collection("savedArticles")
      .find({ userId: session.user.id })
      .sort({ savedAt: -1 })
      .toArray();

    const savedArticles = articles.map((a) => ({
      _id: a._id.toString(), 
      title: a.title,
      description: a.description,
      url: a.url,
      urlToImage: a.urlToImage,
      source: a.source,
    }));

    return { props: { savedArticles } };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { savedArticles: [] } };
  }
}
