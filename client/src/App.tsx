import { Button } from "@mui/material";
import bookOperations from "./graphql/operations/book";
import { useQuery } from "@apollo/client";

// function DisplayBooks() {
//   const { loading, error, data } = useQuery(bookOperations.Queries.getBooks);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;

//   // Replace this with the actual rendering logic for your books
//   // return (
//   //   <ul>
//   //     {data.books.map((book) => (
//   //       <li key={book.author}>{book.title}</li>
//   //     ))}
//   //   </ul>
//   // );
// }

function App() {
  const { loading, error, data, refetch } = useQuery(
    bookOperations.Queries.getBooks
  );

  const handleQueryClick = async () => {
    try {
      // You can do additional logic here if needed
      console.log(data)
      await refetch();
    } catch (error) {
      console.error("Error while refetching:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleQueryClick}>Make Query</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {/* {data && <DisplayBooks />} */}
    </div>
  );
}

export default App;
