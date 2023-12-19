const typeDefs = `
    type User{
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Token{
      value: String!
    }
    type Book{
        title: String! 
        published: Int!
        author: Author!
        id: ID! 
        genres: [String]!
    }
    type Author{
        name: String!
        bookCount: Int
        born: Int
        id: ID!
    }
    type Subscription{
      bookAdded: Book!
    }
    type Query {
        bookCount: Int
        authorCount: Int
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
        recommendedBooks: [Book]
        allGenres: [String]!
    }
    type Mutation{
        addBook(title: String!, published: Int!, author: String!, genres: [String]! ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
      createUser(
        username: String!
        favoriteGenre: String!
        ): User
      login(
        username: String!
        password: String!
      ): Token
    }
`;

module.exports = typeDefs;
