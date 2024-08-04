import ArticleForm from "../components/ArticleForm";
import axios from 'axios'
import Toastify from 'toastify-js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export default function editform({ url }) {
    const [Article, setArticle] = useState({});
    const navigate = useNavigate()
    const { id } = useParams()

    async function fetchArticle() {
        try {
            const { data } = await axios.get(`${url}/apis/news-portal/articles/${id}`)

            setArticle(data.data)
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
        fetchArticle()
    }, [])

    async function handleSubmit(e, name, title, content, imgUrl, rating, categoryId) {
        e.preventDefault()
        try {
            const dataAdded = { name, title, content, imgUrl, rating: +rating, categoryId: +categoryId }

            await axios.put(`${url}/apis/news-portal/articles/${id}`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Toastify({
                text: "Success edit product",
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
                    fontWeight: "bold"
                }
            }).showToast();

            navigate('/')
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

    return (
        <>
            <ArticleForm url={url} handleSubmit={handleSubmit} article={article} nameProp="Edit Article" />
        </>
    )
}