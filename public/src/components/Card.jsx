import { useNavigate } from "react-router-dom";

export default function Card({ article }) {
  const navigate = useNavigate();

  function handleDetail() {
    navigate(`/detail/${id}`);
  }

  return (
    <>
      <div className="card bg-gray-100 shadow flex flex-row">
        <figure className="flex flex-col">
          <img
            src={article.imgUrl}
            alt="product image"
            className="max-w-sm rounded-lg shadow mb-2"
          />
          <button
            className="btn btn-accent btn-sm m-1 w-full"
            onClick={() => handleDetail(article.id)}
          >
            Detail
          </button>
        </figure>
        <div className="card-body flex-1">
          <b>{article.title}</b>
          {article.content}
        </div>
      </div>
    </>
  );
}
