import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      name
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      author {
        name
      }
      title
      id
      published
      genres
    }
  }
`;

export const ALL_BOOKS_FROM_GENRE = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      genres
      id
      published
      title
      author {
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      id
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      bookCount
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      favoriteGenre
      username
    }
  }
`;

export const RECOMMENDED = gql`
  query RecommendedBooks {
    recommendedBooks {
      title
      published
      genres
      id
      author {
        name
      }
    }
  }
`;

export const GENRES = gql`
  query Query {
    allGenres
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    id
    published
    genres
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
