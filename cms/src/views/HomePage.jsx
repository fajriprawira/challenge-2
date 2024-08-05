import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
// import pacmanLoad from "../assets/Bean-Eater@1x-1.0s-200px-200px.svg";

export default function Home({ url }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [filterName, setFilterName] = useState("");

  async function fetchArticles() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/news-portal/articles?q=${search}&name=${filterName}&limit=8&page=1&sort=${sortOrder}&column=${sortColumn}`
      );
      setArticles(data.data.query);
    } catch (error) {
      
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [search]);

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        <form action="" method="get" className="flex justify-center mt-4">
          <input
            type="search"
            name="search"
            placeholder="search"
            className="w-1/2 p-2 border border-gray-300 rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <main className="grid grid-cols-3 gap-5 px-10 my-8 bg-white">
          {articles.map((article) => {
            return (
              <Card
                key={article.id}
                article={article}
                url={url}
                fetchArticles={fetchArticles}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
