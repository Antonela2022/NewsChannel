import { useState } from "react";
import { saveArticle } from "../utils/recordsFunctionsAPI";


const NewsCard = ({ article, isLoggedIn }) => {
  const imageUrl = article.urlToImage || "/placeholder.jpg";
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
  if (!isLoggedIn) {
    alert("⚠️ Please log in to save this article.");
    return;
  }

  const data = await saveArticle(article);

  setSaved(true);

  if (data.alreadySaved) {
    alert("ℹ️ This article is already in your saved list.");
  } else {
    alert("✅ Article saved successfully!");
  }
};


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 relative">
      <div className="relative">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-[500px] object-cover"
        />
        <button
          onClick={handleSave}
          className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition"
          title="Save this news for later"
        >
          💾
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold">{article.title}</h3>
        <div className="flex justify-between items-center text-base my-2">
          <p className="text-yellow-500">📰Source: {article.source?.name}</p>
          <p className="text-gray-600">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </div>
        {article.author && <p className="italic">✍️Authors: {article.author}</p>}
        {article.description && <p className="mt-2">📝Description: {article.description}</p>}
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">
          🔗 Read full article
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
