import gql from "graphql-tag";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String, author: String): Book
  }

  type Subscription {
    commentAdded(postID: ID!): Comment
  }
  type Comment {
    id: ID
    content: String!
  }
`;

export default typeDefs;
