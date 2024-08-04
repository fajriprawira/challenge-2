import { useEffect, useState } from "react";
import axios from 'axios';
import Toastify from 'toastify-js';

export default function ArticlesForm({ url, handleSubmit, article, nameProp }) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [rating, setRating] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (article) {
            setName(article.name);
            setTitle(article.title);
            setContent(article.content);
            setImgUrl(article.imgUrl);
            setRating(article.rating);
            setCategoryId(article.categoryId);
        }
    }, [article]);

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${url}/apis/news-portal/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            setCategories(data.data);
        } catch (error) {
            Toastify({
                text: error.response.data.error,
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
                    fontWeight: "bold"
                }
            }).showToast();
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <form onSubmit={(e) => handleSubmit(e, name, title, content, imgUrl, rating, categoryId)}>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="label">
                        <span className="text-base label-text">Name</span>
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="w-full input input-bordered input-primary"
                        value={name}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Title</span>
                    </label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter Title"
                        className="w-full input input-bordered input-primary"
                        value={title}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Content</span>
                    </label>
                    <input
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        placeholder="Enter Content"
                        className="w-full input input-bordered input-primary"
                        value={content}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Image (URL)</span>
                    </label>
                    <input
                        onChange={(e) => setImgUrl(e.target.value)}
                        type="text"
                        placeholder="Image URL"
                        className="w-full input input-bordered input-primary"
                        value={imgUrl}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Rating</span>
                    </label>
                    <input
                        onChange={(e) => setRating(e.target.value)}
                        type="number"
                        placeholder="Enter Rating"
                        className="w-full input input-bordered input-primary"
                        value={rating}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Category</span>
                    </label>
                    <select
                        className="w-full input input-bordered input-primary"
                        onChange={(e) => setCategoryId(e.target.value)}
                        value={categoryId}
                        name="category"
                    >
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <button type="submit" className="w-full btn btn-accent mt-10">{nameProp}</button>
            </div>
        </form>
    );
}
