const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const Person = require("./models/person");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: async (root, args, context) => {
      return context.currentUser;
    },
    allUsers: async (root, args) => {
      return User.find({});
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("User not logged in", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      try {
        await person.save();
        currentUser.friends.concat(person);
        await currentUser.save();
      } catch (e) {
        throw new GraphQLError("Saving person failed", {
          code: "BAD_USER_INPUT",
          invalidArgs: args.name,
          e,
        });
      }
      pubsub.publish("PERSON_ADDED", { personAdded: person });
      return person;
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (e) {
        throw new GraphQLError("Saving number failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name, error },
        });
      }
      return person;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating new user failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name, error },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Invalid login", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Invalid login", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const person = Person.findOne({ name: args.name });
      const isFriend =
        person &&
        currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString());

      if (!isFriend) {
        currentUser.fiends.concat(person);
      }
      await currentUser.save();
      return currentUser;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator("PERSON_ADDED"),
    },
  },
};

module.exports = resolvers;
