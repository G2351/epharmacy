import API_APP from "../config";
const fetchArticles = async (setArticles, setLoading) => {
  try {
    // Gọi API lấy danh sách bài viết
    const res = await fetch(`${API_APP}/v1/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    setArticles(data.data.articles);
  } catch (error) {
    console.log("Erorr fetching fetchArticles :", error.message || error);
  } finally {
    setLoading(false);
  }
};

export default fetchArticles;
