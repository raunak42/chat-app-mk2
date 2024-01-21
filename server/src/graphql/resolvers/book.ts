import books from "../../db";
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createBook: (_: any, args: { title: string; author: string }) => {
      console.log("Before Mutation:", books);

      const { title, author } = args;
      const newBook = {
        title,
        author,
      };
      books.push(newBook);
      console.log("After Mutation:", books);
      return newBook;
    },
  },
};

export default resolvers;
