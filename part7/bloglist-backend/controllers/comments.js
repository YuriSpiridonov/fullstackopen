const commentsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentsRouter.get("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const comments = await Blog.findById(id).populate("comments");
  response.json(comments); // .map((comment) => comment.toJSON()))
  // if (!id) {
  //   return response.status(204).end()
  // }

  // // /api/blogs/:id/comments
  // const comments = await Comment.find({});
  // // .populate('comment', )

  // response.json(comments.map((comment) => comment.toJSON()));
});

// blogsRouter.get('/', async (request, response) => {
//   const blogs = await Blog
//     .find({})
//     .populate('user', { username: 1, name: 1 })

//   response.json(blogs.map((blog) => blog.toJSON()))
// })
commentsRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body.comment.comment; //.body
  const { id } = request.params;
  console.log("body on backend ", { body });
  console.log("id on backend ", { id });

  const blog = await Blog.findById(id);

  // const user = request.user

  // if (!user) {
  //   return response.status(401).json({ error: 'token is missing or invalid' })
  // }

  const comment = new Comment({
    comment: body, // .comment,
    // body.comment
  });

  // if (!comment.comment) {
  //   response.status(400).end();
  // }
  console.log(`comment on backend ${comment}`);
  // console.log(`comment on backend ${comment.comment}`);
  const savedComment = await comment.save();
  console.log(`savedComment on backend ${savedComment}`);
  console.log(`blog.comments on backend  ${blog}, ${blog.comments}`);
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save(); // { validateModifiedOnly: true });

  response.status(201).json(savedComment.toJSON());
});

module.exports = commentsRouter;
