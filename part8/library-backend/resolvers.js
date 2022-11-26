const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // Implementation with IF ELSE statement
      // const books = await Book.find({}).populate("author");
      // if (args.author && args.genre) {
      //   const author = await Author.findOne({ name: args.author });
      //   const booksByAuthorAndGenre = await Book.find({
      //     $and: [
      //       { author: { $in: [author._id] } },
      //       { genres: { $in: [args.genre] } },
      //     ],
      //   }).populate("author");
      //   return booksByAuthorAndGenre;
      // } else if (args.author) {
      //   const author = await Author.findOne({ name: args.author });
      //   const booksByAuthor = await Book.find({
      //     author: author._id,
      //   }).populate("author");
      //   return booksByAuthor;
      // } else if (args.genre) {
      //   const booksByGenre = await Book.find({ genres: { $in: [args.genre] } });
      //   return booksByGenre;
      // }
      // return books;

      // Implementation with SWITCH statement (experimental)
      switch ((args.author, args.genre)) {
        case args.author !== undefined && args.genre !== undefined:
          const author = await Author.findOne({ name: args.author });
          const booksByAuthorAndGenre = await Book.find({
            $and: [
              { author: { $in: [author._id] } },
              { genres: { $in: [args.genre] } },
            ],
          }).populate("author");
          return booksByAuthorAndGenre;
        case args.author !== undefined:
          const author2 = await Author.findOne({ name: args.author });
          const booksByAuthor = await Book.find({
            author: author2._id,
          }).populate("author");
          return booksByAuthor;
        case args.genre !== undefined:
          const booksByGenre = await Book.find({
            genres: { $in: [args.genre] },
          });
          return booksByGenre;
        default:
          const books = await Book.find({}).populate("author");
          return books;
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const allAuthors = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author._id,
        };
      });
      return allAuthors;
    },
  },
  Book: {
    author: async (root) => await Author.findById(root.author),
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== process.env.PASSWORD) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const currentAuthor = await Author.findOne({ name: args.author });
      if (!currentAuthor) {
        const author = new Author({ name: args.author });
        try {
          const book = new Book({ ...args, author: author._id });
          author.books = author.books.concat(book._id);
          await author.save();
          await book.save();
          pubsub.publish("BOOK_ADDED", { bookAdded: book }); // ?????
          return book;
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      } else {
        const book = new Book({ ...args, author: currentAuthor._id });
        currentAuthor.books = currentAuthor.books.concat(book._id);

        try {
          await book.save();
          await currentAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book;
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const authorToEdit = await Author.findOne({ name: args.name });
      if (!authorToEdit) {
        return null;
      }
      authorToEdit.born = args.born;

      try {
        await authorToEdit.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return authorToEdit;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
