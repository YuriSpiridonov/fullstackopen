import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

const PostForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="mt-2">Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title:"
            onChange={handleTitleChange}
          />

          <Form.Label className="mt-2">Author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author:"
            onChange={handleAuthorChange}
          />

          <Form.Label className="mt-2">Url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="Url:"
            onChange={handleUrlChange}
          />
        </Form.Group>
        <Button
          variant="success"
          id="create"
          className="justify-content-end mt-3"
          type="submit"
        >
          Create{' '}
        </Button>
      </Form>
    </div>
  )
}

PostForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default PostForm
