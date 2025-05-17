import { useState } from "react";

const NewsCard = ({ article, isLoggedIn }) => {
  const imageUrl = article.urlToImage || "/placeholder.jpg";
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!isLoggedIn) {
      alert("⚠️ Please log in to save this article.");
      return;
    }

    // TODO: salvează în Mongo sau localStorage, după preferințe
    setSaved(true);
    alert("✅ Article saved successfully!");
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
          {saved ? "✅" : "💾"}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-2xl font-bold">{article.title}</h3>

        <div className="flex justify-between items-center text-base my-2">
          <p className="text-yellow-500">📰 {article.source?.name}</p>
          <p className="text-gray-600">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </div>

        {article.author && (
          <p className="text-base italic text-gray-700 mt-1">✍️ {article.author}</p>
        )}

        {article.description && (
          <p className="text-lg text-gray-800 mt-3">
            📝 <span className="font-semibold">Description:</span> {article.description}
          </p>
        )}

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base mt-3 text-blue-600 hover:underline flex items-center gap-1"
        >
          🔗 Read the full article
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
