const logger = require('./logger')

const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((favouriteBlog, blog) => {
    if (favouriteBlog.likes > blog.likes)
      return favouriteBlog
  else
      return blog
  }, {})
}


module.exports = {
  dummy, totalLikes, favouriteBlog
} 