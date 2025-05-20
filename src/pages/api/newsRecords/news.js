export default async function handler(req, res) {
  const { category, page = 1 } = req.query;
  const pageNum = parseInt(page, 10);
  const pageSize = 20;

  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({
      articles: data.articles,
      totalResults: data.totalResults,
      pageSize,
    });
  } catch (error) {
    console.error("Fetch news error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
