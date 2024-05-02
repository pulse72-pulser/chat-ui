import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";

import Main from "../components/chats";
// import MainLayout from "./layouts/main.layout";
import { getChats, getChatById ,createChat, sendMessage} from '../services/chat.services'; // Ensure getChatById is imported

export default function ChatsPage() {
  const { state, getAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]); // State to hold messages for the selected chat

  const handleChatCreated = (chat) => {
    // Optionally refresh the chat list or take other actions
    console.log('Chat created successfully!');
    setChats([...chats, chat]);
    setSelectedChat(chat.chat_id);

  };

  const handleCreateChat = async (newChat) => {
    if (!state?.isAuthenticated) {
      navigate("/sign-in");
    } else {
        const token = await getAccessToken();
        const newCreatedChat = await createChat(token, newChat);
        handleChatCreated(newCreatedChat);
    }
  };

  
  const sendChatMessage = async(userMessage)=>{
    // setMessages([...messages, userMessage]);
    userMessage["chat_id"] = selectedChat;
    const token = await getAccessToken();

    const botChat = await sendMessage(token,userMessage);
    console.log("botChat:",botChat)
    const botMessage = {
      id: messages.length,  // This might not be the best way to assign IDs in a real app
      text: botChat.text,
      role: 'bot'
    }
    setMessages([...messages, userMessage,botMessage]);
  }

  useEffect(() => {

      const getData = async () => {
        try {
          const token = await getAccessToken();
          const chatsData = await getChats(token);
          console.log("chatsData",chatsData)
          setChats(chatsData?.chats);
          if (chatsData?.chats.length > 0) {
            setSelectedChat(chatsData.chats[0].chat_id); // Automatically select the first chat initially
          }
        } catch (e) {
          console.error(e);
          // if (!state?.isAuthenticated) {
          //   navigate("/");
          // } 
        }
    }
    getData();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const token = await getAccessToken();
          const chatDetails = await getChatById(selectedChat, token); // Ensure this function signature matches the API call
          console.log("chat messages:",chatDetails)
          setMessages(chatDetails?.userChats || []);
        } catch (error) {
          console.error('Error fetching messages for chat:', error);
          setMessages([]); // Handle error by clearing messages or setting an error state
        }
      }
    };

    fetchMessages();
  }, [selectedChat]);

  return (
    <>
        <Main
          chats={chats}
          selectedChat={selectedChat}
          messages={messages}
          setMessages={setMessages}
          onChatSelect={setSelectedChat}
          onCreate = {handleCreateChat}
          sendChatMessage = {sendChatMessage}
        />
    </>
  );
}
