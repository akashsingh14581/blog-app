import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import BlogDetails from "../components/BlogDetails";

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading, loading } = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    try {
      const res = await fetch(`${newBaseUrl}get-blog?blogId=${blogId}`);
      const data = await res.json();
      setBlog(data.blog || null);
      setRelatedBlogs(data.relatedBlogs || []);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  return (
    <div className="mt-[70px] ">
      <Header />
     <div className="max-w-[800px] mx-auto px-4 py-6">
      <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 transition-shadow duration-150 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

      {loading ? (<div className="py-20">
  <Spinner />    </div>
) : blog ? (
  <div className="space-y-8">
    <BlogDetails post={blog} />

    {/* Heading for related blogs */}
    <h2 className="mt-8 text-xl font-semibold text-gray-800">
      Related Blogs
    </h2>

    {/* Related list */}
    {relatedBlogs.length > 0 ? (
      <div className="mt-4 space-y-4">
        {relatedBlogs.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-sm rounded-xl">
            <BlogDetails post={post} />
          </div>
        ))}
      </div>
    ) : (
      <p className="mt-2 text-sm text-gray-500">No related blogs available</p>
    )}
  </div>
) : (
  <p className="py-8 text-center text-gray-600">No blog available</p>
)}
    </div>
    </div>
  );
};

export default BlogPage;
