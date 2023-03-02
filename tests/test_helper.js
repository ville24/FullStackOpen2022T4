const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogs = async () => {

}

const nonExistingId = async () => {

}

const blogsInDb = async () => {

}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}