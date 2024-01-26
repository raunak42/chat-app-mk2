// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatComponent from "./Components/chatComponent";
import UsernameForm from "./Components/usernameForm";

function getUsernameFromUrl() { 
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("username") || "User1";
}

function App() {
  const username = getUsernameFromUrl();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsernameForm />} />
        <Route path="/chat" element={<ChatComponent username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;
