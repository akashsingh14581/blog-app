import React, { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);  // initial post is empty array
    const [page, setPage] = useState(1);    // initial page is 1
    const [totalPages, setTotalPages] = useState(null); // in this, we don't know what may be the initial value so that is why null
    const navigate = useNavigate();


 async function fetchBlogPosts(page = 1, tag=null, category) {
    setLoading(true);
     let url = `${baseUrl}?page=${page}`
     if(tag){
        url += `&tag=${tag}`
     }
     if(category){
        url += `&category=${category}`
     }
    try {
       
        const result = await fetch(url);
        const data = await result.json();
        console.log(data);
        setPage(data.page);
        setPosts(data.posts);
        setTotalPages(data.totalPages);

    } catch (error) {
        console.error('error in fetching data', error);
        setPage(1);
        setPosts([]);
        setTotalPages(null);

    }

    setLoading(false);
 }

 function handlePageChange(page){
    navigate({search: `?page=${page}`})
    setPage(page);
 }

    const value = {
        posts,
        loading,
        totalPages,
        page,
        setLoading,
        setPosts,
        setPage,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}