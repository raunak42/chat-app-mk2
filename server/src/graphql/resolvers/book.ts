import { Book } from "../../models/book";
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    books: async() => await Book.find()
  },
  Mutation: {
    createBook: async (_: any, args: { title: string; author: string }) => {

      const { title, author } = args;
      const newBook = {
        title,
        author,
      };

      const book = await Book.findOne({ title: newBook.title });
      if(book){
        return book;
      }else{
        const addNewBook = new Book(newBook);
        await addNewBook.save();
      }

      return newBook;
    },
  },
};

export default resolvers;
