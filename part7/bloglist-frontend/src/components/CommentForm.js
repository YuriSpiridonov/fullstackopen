/* eslint-disable */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ handleNewComment }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    handleNewComment({
      // comment: comment,
      comment,
    })
    setComment('')
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <label>
          <p>
            comment:
            <input
              id="comment"
              type="text"
              value={comment}
              name="Comment:"
              onChange={handleCommentChange}
            />
          </p>
        </label>
        <button id="add-comment" type="submit">
          add comment
        </button>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  handleNewComment: PropTypes.func.isRequired,
}

export default CommentForm
