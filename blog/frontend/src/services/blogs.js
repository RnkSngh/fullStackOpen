import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}
const newBlog = async (title, author, url, token) => {
  const result = await axios.post(
    baseUrl,
    {
      title,
      author,
      url,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return result.data
}

const updateBlog = async (blog, token) => {
  const result = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return result.data
}

const deleteBlog = async (blogId, token) => {
  const result = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return result.data
}

const commentBlog = async (blogId, content, token) => {
  const result = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    {
      content,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return result.data
}

export default { getAll, newBlog, updateBlog, deleteBlog, getOne, commentBlog }
