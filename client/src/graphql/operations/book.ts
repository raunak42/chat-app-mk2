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
  },
  Subscriptions: {},
};
