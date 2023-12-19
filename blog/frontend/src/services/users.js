import axios from 'axios'

const baseUrl = '/api/users'

const getAllUsers = async () => {
  const users = await axios.get(baseUrl)
  return users.data
}

const getUser = async (id) => {
  const url = `${baseUrl}/${id}`
  const users = await axios.get(url)
  return users.data
}

export default { getAllUsers, getUser }
