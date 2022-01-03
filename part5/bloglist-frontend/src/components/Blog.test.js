import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    user: 'Gus',
    likes: 3
  }
  const loggedUser = ''
  const handleBlogDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )
  expect(component.container).toHaveTextContent(
    'Blog Author'
  )
  expect(component.container).not.toHaveTextContent(
    'google.com'
  )
  expect(component.container).not.toHaveTextContent(
    'Gus'
  )
  expect(component.container).not.toHaveTextContent(
    3
  )
})