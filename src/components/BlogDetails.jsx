import React from 'react';
import { NavLink } from 'react-router-dom';

function BlogDetails({ post }) {
  return (
    <div className="max-w-[800px] mx-auto p-4 bg-white rounded-2xl shadow-lg">
      {/* Title */}
      <NavLink to={`/blog/${post.id}`}>
        <h1 className="text-2xl font-bold text-gray-900 transition-colors duration-200 md:text-3xl hover:text-blue-600">
          {post.title}
        </h1>
      </NavLink>

      {/* Author & Category */}
      <p className="mt-2 text-sm text-gray-500">
        By{" "}
        <span className="font-medium text-gray-800">{post.author}</span> on{" "}
        <NavLink
          to={`/category/${post.category.replaceAll(" ", "-")}`}
          className="text-blue-500 hover:underline"
        >
          {post.category}
        </NavLink>
      </p>

      {/* Date */}
      <p className="mb-4 text-xs text-gray-400">
        Posted on <span>{post.date}</span>
      </p>

      {/* Content */}
      <p className="mb-4 leading-relaxed text-gray-700">
        {post.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag, index) => (
          <NavLink
            key={index}
            to={`/tags/${tag.replaceAll(" ", "-")}`}
            className="px-3 py-1 text-sm text-blue-600 transition-colors duration-200 rounded-full bg-blue-50 hover:bg-blue-100"
          >
            #{tag}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default BlogDetails;
