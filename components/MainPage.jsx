"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Filters from "./Filters";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import { fetchNewsFromAPI } from "../utils/recordsFunctionsAPI";
import { useSession } from "next-auth/react";

const MainPage = () => {
    const { data: session } = useSession(); 
    const isLoggedIn = !!session;
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  // Încarcă articolele pentru o pagină dată
  const fetchNews = async (pageToFetch = 1, reset = false) => {
    setLoading(true);
    const data = await fetchNewsFromAPI(category, pageToFetch);
    if (reset) {
      setArticles(data.articles);
    } else {
      setArticles(prev => [...prev, ...data.articles]);
    }
    setTotalResults(data.totalResults);
    setPageSize(data.pageSize);
    setLoading(false);
  };

  // La schimbarea categoriei, resetează pagina și încarcă de la 1
  useEffect(() => {
    setPage(1);
    fetchNews(1, true);
  }, [category]);

  // Load more
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  // Calculăm total pagini dinamc
  const totalPages = Math.ceil(totalResults / pageSize);

  // Putem încă să încarcăm?
  const canLoadMore = page < totalPages;

  return (
    <>
      <Header />
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Filters type={category} setType={setCategory} />

        {loading && page === 1 ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articles.map((article, i) => (
                <NewsCard key={i} article={article} isLoggedIn={isLoggedIn} />
              ))}
            </div>

            {loading && page > 1 && <Spinner />}

            {canLoadMore && !loading && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={loadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
                >
                  Load More
                </button>
              </div>
            )}

            {!canLoadMore && (
              <p className="text-center mt-6 text-gray-600">No more articles to load.</p>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default MainPage;
