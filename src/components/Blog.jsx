import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from './Spinner'
import './Blog.css'


function Blog() {
  const {loading, posts} = useContext(AppContext)
  return (
    <div>
      {
        loading ? (<Spinner />):(
          posts.length === 0 ? (<p>no content available</p>) : (   <div className='card-container'>{posts.map((post)=>(
         
              <div className='card'>
              <p className='title'>{post.title}</p>
              <p>
                By <span>{post.author}</span> on <span>{post.category}</span>
              </p>
              <p>posted on <span>{post.date}</span></p>
              <p className='desc'>{post.content}</p>
              <div className='tag-container'>{post.tags.map((tag, index)=>(<p key={index} className="tags">#{tag}</p>))}</div>
            </div>
            
          ))}</div>)
        )
      }
    </div>
  )
}

export default Blog
