import React, { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [loading, setLoding] = useState(false);
    const [posts, setPosts] = useState([]);  // initial post is empty array
    const [page, setPage] = useState(1);    // initial page is 1
    const [totalPages, setTotalPages] = useState(null); // in this, we don't know what may be the initial value so that is why null



 async function fetchBlogPosts(page = 1) {
    setLoding(true);
     let url = `${baseUrl}?page=${page}`
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

    setLoding(false);
 }

 function handlePageChange(page){
    setPage(page);

    fetchBlogPosts(page);
 }

    const value = {
        posts,
        loading,
        totalPages,
        page,
        setLoding,
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