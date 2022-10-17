const commentsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentsRouter.get("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const comments = await Blog.findById(id).populate("comments");
  response.json(comments);
});

commentsRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body.comment.comment;
  const { id } = request.params;
  console.log("body on backend ", { body });
  console.log("id on backend ", { id });

  const blog = await Blog.findById(id);

  const comment = new Comment({
    comment: body,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save(); // { validateModifiedOnly: true });

  response.status(201).json(savedComment.toJSON());
});

module.exports = commentsRouter;
