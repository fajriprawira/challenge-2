import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Card({ article, url, fetchArticles }) {
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/news-portal/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Success delete",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      fetchArticles();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Error deleting article",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  function handleDetail(id) {
    navigate(`/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="card bg-gray-100 shadow flex flex-row">
      <figure className="flex flex-col">
        <img
          src={article.imgUrl}
          alt="article image"
          className="max-w-sm rounded-lg shadow mb-2"
        />
        <button
          onClick={() => handleDetail(article.id)}
          className="btn btn-accent btn-sm m-1 w-full"
        >
          Detail
        </button>
        <button
          onClick={() => handleDelete(article.id)}
          className="btn btn-error btn-sm m-1 w-full"
        >
          Delete
        </button>
        <button
          onClick={() => handleEdit(article.id)}
          className="btn btn-warning btn-sm m-1 w-full"
        >
          Edit
        </button>
      </figure>
      <div className="card-body flex-1">
        <b>{article.title}</b>
        {article.content}
      </div>
    </div>
  );
}
