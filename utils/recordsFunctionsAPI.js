export const fetchNewsFromAPI = async (category, page = 1) => {
  try {
    const res = await fetch(`/api/newsRecords/news?category=${category}&page=${page}`);
    const data = await res.json();
    return data; // { articles, totalResults, pageSize }
  } catch (error) {
    console.error("Fetch news error:", error);
    return { articles: [], totalResults: 0, pageSize: 20 };
  }
};
