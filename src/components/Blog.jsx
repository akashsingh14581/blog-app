import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
import BlogDetails from './BlogDetails';





function Blog() {
  const { loading, posts } = useContext(AppContext);

  return (
    <div className='w-11/12 mt-[50px] mb-[84px] max-w-[630px] mx-auto px-2'>
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No content available</p>
      ) : (
        <div className='flex flex-col gap-6'>
          {posts.map((post, index) => (
          <BlogDetails key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
