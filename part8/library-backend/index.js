const { ApolloServer, gql } = require("apollo-server");
const config = require("./utils/config");
const mongoose = require("mongoose");

const Author = require("./models/author");
const Book = require("./models/book");

console.log("connecting to ", config.MONGOOSE_URI);

mongoose
  .connect(config.MONGOOSE_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB: ", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(), // books.length,
    authorCount: async () => await Author.collection.countDocuments(), // authors.length,
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
      const allAuthors = await Author.find({});
      return allAuthors;
    },
  },
  Author: {
    bookCount: async (root) =>
      await Book.collection.countDocuments({ author: root._id }),
  },
  Book: {
    author: async (root) => await Author.findById(root.author),
  },
  Mutation: {
    addBook: async (root, args) => {
      const currentAuthor = await Author.findOne({ name: args.author });
      if (!currentAuthor) {
        const author = new Author({ name: args.author });

        try {
          await author.save();
          const book = new Book({ ...args, author: author._id });
          await book.save();
          return book;
        } catch (error) {
          console.log(error);
        }
      } else {
        const book = new Book({ ...args, author: currentAuthor._id });

        try {
          await book.save();
        } catch (error) {
          console.log(error);
        }

        return book;
      }
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name });
      if (!authorToEdit) {
        return null;
      }
      authorToEdit.born = args.born;

      try {
        await authorToEdit.save();
      } catch (error) {
        console.log(error);
      }
      return authorToEdit;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
