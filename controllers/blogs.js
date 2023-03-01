const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url)
    next({
      name:'ValidationError',
      message: 'title or url missing'
    })

  !blog.likes && (blog.likes = 0)

  await blog.save()
  response.status(201).json(response.result)
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