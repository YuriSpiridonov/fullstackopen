import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleBlogDelete, loggedUser }) => (
  <div>
    {blogs.map(blog => (
      <Blog
        id={blog.id}
        blog={blog}
        handleLike={() => handleLike(blog)}
        handleBlogDelete={() => handleBlogDelete(blog)}
        loggedUser={loggedUser}
      />
    ))}
  </div>
)

export default BlogList
