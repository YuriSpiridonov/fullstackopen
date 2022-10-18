/* eslint-disable */
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ListGroup from 'react-bootstrap/ListGroup'

const Comment = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  return (
    <div>
      {blog.comments.length > 0 ? (
        <ListGroup variant="flush">
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.comment}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </div>
  )
}

export default Comment
