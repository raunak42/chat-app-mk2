import React, { useState, useEffect } from "react";
import { useSubscription, useMutation, gql } from "@apollo/client";
import { Box, Button, Card, TextField } from "@mui/material";

interface ChatMessage {
  sender: string;
  content: string;
}

const CHAT_SUBSCRIPTION = gql`
  subscription onChatMessage {
    chatMessage {
      sender
      content
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($sender: String, $content: String!) {
    sendMessage(sender: $sender, content: $content)
  }
`;

interface ChatComponentProps {
  username: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ username }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { data, loading } = useSubscription<{ chatMessage: ChatMessage }>(
    CHAT_SUBSCRIPTION
  );
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  useEffect(() => {
    if (data && data.chatMessage) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        data.chatMessage,
      ]);
    }
  }, [data]);

  const handleSendMessage = () => {
    sendMessage({ variables: { sender: username, content: message } })
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end", // Align items to the bottom
        marginTop: 50,
      }}
    >
      <Card
        sx={{
          bgcolor: "GrayText",
          width: "26vw",
          height: "88vh",
          borderRadius: 2,
          padding: 1,
          color: "black",
          display: "flex",
          flexDirection: "column", // Arrange children in a column
        }}
      >
        {loading && <p>Loading...</p>}

        <div>
          <strong>Chat:</strong>
          {chatHistory.map((chatMessage, index) => (
            <div
              key={index}
              style={{
                textAlign: chatMessage.sender === username ? "right" : "left",
              }}
            >
              <Box>{`${chatMessage.sender}: ${chatMessage.content}`}</Box>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <TextField
            size="small"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button size="small" variant="contained" onClick={handleSendMessage} style={{marginLeft:5}}>
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatComponent;
