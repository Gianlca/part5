import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }



  return (
    <div style={blogStyle} className="blogElement">
      {blog.title}
      {blog.author}

      <span style={hideWhenVisible}>
        <button className="viewButton" onClick={() => setVisible(true)}>view</button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={() => setVisible(false)}>hide</button>
      </span>
      <span>
        <button onClick={handleDelete} id="deleteButton">delete</button>
      </span>

      <div style={showWhenVisible} className="details">
        <br />
        <span className="numberLikes">{blog.likes}</span> <button onClick={handleLikes} id="like">like</button>
        <br />
        {blog.url}
        <br />
      </div>

    </div>
  )
}
export default Blog