import { Button, Stack, TextField } from "@mui/material";
import bookOperations from "./graphql/operations";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

interface bookType {
  title: string;
  author: string;
}

function DisplayBooks() {
  const { loading, error, data } = useQuery(bookOperations.Queries.getBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // Replace this with the actual rendering logic for your books
  return (
    <ul>
      {data.books.map((book: bookType) => (
        <li key={book.author}>{book.title}</li>
      ))}
    </ul>
  );
}

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [createBook, { loading: mutationLoading, error: mutationError }] =
    useMutation(bookOperations.Mutations.createBook, {
      onCompleted: () => {
        refetch();
      },
    });

  const { loading, error, data, refetch } = useQuery(
    bookOperations.Queries.getBooks
  );

  const handleQueryClick = async () => {
    try {
      // You can do additional logic here if needed
      console.log(data);
      await refetch();
    } catch (error) {
      console.error("Error while refetching:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await createBook({
        variables: {
          title: title,
          author: author,
        },
      });

      // Clear the input fields after submitting the mutation
      setTitle("");
      setAuthor("");
    } catch (error) {
      console.error("Error while creating book:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleQueryClick}>Make Query</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && <DisplayBooks />}
      <br></br>
      <Stack width={"20vw"} spacing={3}>
        Create Book
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></TextField>
        <TextField
          label="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        ></TextField>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>

      {mutationLoading && <p>Creating book...</p>}
      {mutationError && <p>Error : {mutationError.message}</p>}
    </div>
  );
}

export default App;
