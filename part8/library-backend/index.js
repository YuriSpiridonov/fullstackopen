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
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author &&
            book.genres.filter((genre) => genre === args.genre)
        );
      } else if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else if (args.genre) {
        return books.filter((book) =>
          book.genres.find((genre) => genre === args.genre)
        );
      }
      return books;
    },
    allAuthors: () =>
      authors.map((author) => {
        return {
          name: author.name,
          bookCount: books.filter((book) => book.author === author.name).length,
          born: author.born,
          id: author.id,
        };
      }),
  },
  Book: {
    author: (root) => {
      return {
        name: root.name,
      };
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // const currentAuthor = await Author.findOne({ name: args.author });

      // if (!currentAuthor) {

      const currentAuthor = await Author.findOne({ name: args.author });
      // const book = new Book({ ...args, author: author._id });
      if (!currentAuthor) {
        const author = new Author({ name: args.author });
        console.log(author);

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
        console.log("book: ", book);

        try {
          await book.save();
        } catch (error) {
          console.log(error);
        }

        return book;
      }
    },
    editAuthor: (root, args) => {
      const currentAuthor = authors.find((author) => author.name === args.name);
      if (!currentAuthor) {
        return null;
      }
      const updatedAuthor = {
        ...currentAuthor,
        bookCount: books.filter((book) => book.author === args.name).length,
        born: args.born,
      };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
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
