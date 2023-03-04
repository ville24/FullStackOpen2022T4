const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  let decodedToken = null

  try {
    decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
  }
  catch (exception) {
    next(exception)
  }

  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url)
    next({
      name:'ValidationError',
      message: 'title or url missing'
    })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).end()
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id, { useFindAndModify: false })
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = new Blog(request.body)
  blog._id = request.params.id

  await Blog
    .findByIdAndUpdate( request.params.id, blog, { new: true, overwrite: true, useFindAndModify: false } )
  response.status(201).json(response.result)
})

module.exports = blogsRouter