import { useState, useEffect } from "react";
import { deleteArticle, getSavedArticles } from "../utils/recordsFunctionsAPI";
import Spinner from "../components/Spinner";

const SavedNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            const data = await getSavedArticles();
            if (data) {
                setArticles(data);
            }
            setLoading(false);
        };

        loadArticles();
    }, []);

    const handleDelete = async (id) => {
        const data = await deleteArticle(id);
        if (data) {
            setArticles(articles.filter((a) => a._id !== id));
        }
    };

    if (loading) return <Spinner />;
    
    return (
        <main className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">📰 Saved News</h1>
            {articles.length === 0 ? (
                <p className="text-gray-600">No saved articles.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {articles.map((article) => (
                        <div key={article._id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                            <button
                                onClick={() => handleDelete(article._id)}
                                className="absolute top-2 right-2 bg-white text-red-600 hover:text-red-800 rounded-full p-1 shadow z-10"
                                title="Delete article"
                            >
                                <span className="text-lg">❌</span>
                            </button>

                            <img
                                src={article.urlToImage || "/placeholder.jpg"}
                                alt={article.title}
                                className="w-full h-[250px] object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">{article.title}</h3>
                                <p className="text-sm text-gray-500">{article.source?.name}</p>
                                <p className="mt-2">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    className="text-blue-600 hover:underline mt-2 block"
                                    rel="noreferrer"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default SavedNews;
