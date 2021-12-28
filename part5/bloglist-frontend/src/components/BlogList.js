import Blog from './Blog'

const BlogList = ({ blogs, handleLike }) => (
  <div>
    {blogs.map(blog => (
      <Blog
        id={blog.id}
        blog={blog}
        handleLike={() => handleLike(blog)}
      />
    ))}
  </div>
)

export default BlogList
