import React from 'react'
import PropTypes from 'prop-types'

const PostForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> 
          <p>
            Title:
            <input
              type='text'
              value={title}
              name='Title:'
              onChange={handleTitleChange} // {handleBlogChange}
            />
          </p>
        </label>
        <label> 
          <p>
            Author:
            <input
              type='text'
              value={author}
              name="Author:"
              onChange={handleAuthorChange} // {handleAuthorChange}
            />
          </p>
        </label>
        <label>
          <p>
            Url:
            <input
              type='text'
              value={url}
              name="Url:"
              onChange={handleUrlChange} // {handleUrlChange}
            />
          </p>
        </label>
        <button type='submit'>create</button>
      </form>
    </div>

  )

}

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default PostForm
