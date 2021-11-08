/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
const BlogForm = ({
  onSubmit,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => setTitle(event.target.value)

  const handleAuthor = (event) => setAuthor(event.target.value)

  const handleUrl = event => setUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    onSubmit({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog} className="formBlog">
        <div>
          title:
          <input value={title} id="title" onChange={handleTitle} />
        </div>
        <div>
          author:
          <input value={author} id="author" onChange={handleAuthor} />
        </div>
        <div>
          url:
          <input value={url} id="url" onChange={handleUrl} />
        </div>
        <button id="button-create">create</button>
      </form>
    </>
  )
}
export default BlogForm
