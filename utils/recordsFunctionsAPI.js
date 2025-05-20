export const fetchNewsFromAPI = async (category, page = 1) => {
  try {
    const res = await fetch(`/api/newsRecords/news?category=${category}&page=${page}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch news error:", error);
    return { articles: [], totalResults: 0, pageSize: 20 };
  }
};


export const saveArticle = async (article) => {
  try {
    const res = await fetch("/api/saveArticle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article }),
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Save failed:", error);
    return null;
  }
};

export const deleteArticle = async (id) => {
  try {
    const res = await fetch("/api/deleteArticle", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Delete error:", error);
    return null;
  }
};

export const getSavedArticles = async () => {
  try {
    const res = await fetch("/api/savedArticles");
    if (!res.ok) throw new Error("Failed to fetch articles");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

