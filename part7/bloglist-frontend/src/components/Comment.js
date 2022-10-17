/* eslint-disable */
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Comment = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  return (
    <div>
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default Comment
