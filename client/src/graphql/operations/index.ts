import { gql } from "@apollo/client";

export default {
  Queries: {
    getBooks: gql`
      query getBooks {
        books {
          title
          author
        }
      }
    `,
  },
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
    
    createBook: gql`
      mutation createBook($title: String!, $author: String!) {
        createBook(title: $title, author: $author) {
          title
          author
        }
      }
    `,
  },
  Subscriptions: {
    COMMENTS_SUBSCRIPTION: gql`
      subscription OnCommentAdded($postID: ID!) {
        commentAdded(postID: $postID) {
          id
          content
        }
      }
    `,
    
  },
};
