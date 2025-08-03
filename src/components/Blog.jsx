import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';

function Blog() {
  const { loading, posts } = useContext(AppContext);

  return (
    <div className='w-11/12 mt-[84px] mb-[84px] max-w-[630px] mx-auto px-2'>
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No content available</p>
      ) : (
        <div className='flex flex-col gap-6'>
          {posts.map((post, index) => (
            <div
              key={index}
              className='p-4 transition-shadow duration-300 bg-white border rounded-lg shadow-sm hover:shadow-md'
            >
              <p className='mb-1 text-lg font-bold sm:text-xl'>{post.title}</p>

              <p className='mb-1 text-xs text-gray-500 sm:text-sm'>
                By <span className='italic'>{post.author}</span> on{' '}
                <span className='font-semibold underline'>{post.category}</span>
              </p>

              <p className='mb-2 text-xs text-gray-500 sm:text-sm'>
                Posted on <span>{post.date}</span>
              </p>

              <p className='mb-2 text-sm sm:text-base'>{post.content}</p>

              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='text-xs font-semibold text-blue-600 underline'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
