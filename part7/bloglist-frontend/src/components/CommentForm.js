/* eslint-disable */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ handleNewComment }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    handleNewComment({
      comment,
    })
    setComment('')
  }

  return (
    <div>
      <Form id="form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="mt-2">Comment:</Form.Label>
          <Form.Control
            id="comment"
            type="text"
            value={comment}
            name="Comment:"
            onChange={handleCommentChange}
          />
          <Button
            id="add-comment"
            variant="outline-dark"
            size="sm"
            type="submit"
            className="mt-3 mb-3"
          >
            Add Comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

CommentForm.propTypes = {
  handleNewComment: PropTypes.func.isRequired,
}

export default CommentForm
