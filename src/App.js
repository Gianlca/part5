/* eslint-disable no-inner-declarations */
import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [succesMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const blogRef = useRef()

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const userObject = { username, password }
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }



  const handleCreation = async(newBlog) => {
    blogRef.current.toggleVisibility()
    try {
      const response = await blogService.createBLog(newBlog)
      setBlogs(blogs.concat(response))
      setSuccessMessage(`a new blog ${response.title} by ${response.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikes = async(id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const response = await blogService.likedBlog(id, changedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async(id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogsList = () => (
    <div>
      <div>
        {user.username} <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogRef}>
        <BlogForm onSubmit={handleCreation} />
      </Togglable>
      <br />
      {blogs ? blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={() => handleLikes(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
          />
        )) : <div>no blogs </div>}
    </div>
  )

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if(user !== null) {
      async function fetchBlogs() {
        const response = await blogService.getAll()
        setBlogs( response )
      }
      fetchBlogs()
    }
  }, [user])

  return (
    <div>
      <Notification message={succesMessage} type={'success'} />
      <Notification message={errorMessage} type={'error'} />
      <h2>blogs</h2>
      {user === null ? loginForm() : blogsList()}
    </div>
  )
}

export default App