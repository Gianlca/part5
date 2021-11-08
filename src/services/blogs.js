import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  return token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBLog = async(blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likedBlog = async(id, blog) => {
  const config = {
    headers:{
      Authorization: token
    }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteBlog = async(id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, createBLog, likedBlog, deleteBlog }