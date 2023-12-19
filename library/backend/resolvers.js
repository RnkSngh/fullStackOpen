const { GraphQLError } = require("graphql");
const Book = require("./models/books");
const Author = require("./models/authors");
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filters = {};
      if (args.genre) {
        filters = { ...filters, genres: args.genre };
      }
      return Book.find(filters).populate("author");
    },
    allAuthors: async () => {
      // const books =
      const authorBooks = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "book",
          },
        },

        {
          $addFields: { bookCount: { $size: "$book" } },
        },
        {
          $sort: {
            bookCount: -1,
          },
        },
      ]);

      return authorBooks.map((author) => {
        return { ...author, id: author._id };
      });
    },
    allGenres: async (root) => {
      return Book.distinct("genres");
    },
    recommendedBooks: async (root, args, { currentUser }) => {
      if (currentUser) {
        return Book.find({
          genres: currentUser.favoriteGenre,
        }).populate("author");
      }
      return null;
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Invalid login", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save().catch((error) => {
          throw new GraphQLError("Error saving author", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        });
      }
      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      });
      try {
        await newBook.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook;
      } catch (e) {
        throw new GraphQLError("Error saving new Book", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            e,
          },
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Invalid login", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const existingAuthor = await Author.findOne({ name: args.name });
      if (!existingAuthor) {
        return null;
      }
      existingAuthor.born = args.setBornTo;
      return existingAuthor.save().catch((error) => {
        throw new GraphQLError("Error sving newBook", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });
    },
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return newUser.save().catch((error) => {
        throw new GraphQLError("Error saving new user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Invalid login", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = { username: user.username, id: user._id };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
