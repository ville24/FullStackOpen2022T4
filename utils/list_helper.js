const logger = require('./logger')

const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((favouriteBlog, blog) => 
    favouriteBlog.likes > blog.likes
    ? favouriteBlog
    : blog
  , {})
}


module.exports = {
  dummy, totalLikes, favouriteBlog
} 