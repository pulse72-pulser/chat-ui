import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";

import Chats from "../components/chats";
import MainLayout from "./layouts/main.layout";
import { getChats, getChatById } from '../services/chat.services'; // Ensure getChatById is imported

export default function ChatsPage() {
  const { state, getAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]); // State to hold messages for the selected chat

  const handleChatCreated = (chat) => {
    // Optionally refresh the chat list or take other actions
    console.log('Chat created successfully!');
    if (!state?.isAuthenticated) {
      navigate("/");
    } else {
        const token = await getAccessToken();
        const chatsData = await getChats(token);
        setChats(chatsData?.chats);
        setSelectedChat(chat.chat_id);
    }
  };

  const handleCreateChat = async (newChat) => {
    if (!state?.isAuthenticated) {
      navigate("/");
    } else {
        const token = await getAccessToken();
        const chatsData = await createChat(token, newChat);
    }
  };

  useEffect(() => {
    if (!state?.isAuthenticated) {
      navigate("/");
    } else {
      const getData = async () => {
        try {
          const token = await getAccessToken();
          const chatsData = await getChats(token);
          setChats(chatsData?.chats);
          if (chatsData?.chats.length > 0) {
            setSelectedChat(chatsData.chats[0].id); // Automatically select the first chat initially
          }
        } catch (e) {
          console.error(e);
        }
      };
      getData();
    }
  }, [state?.isAuthenticated, navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const token = await getAccessToken();
          const chatDetails = await getChatById(selectedChat, token); // Ensure this function signature matches the API call
          setMessages(chatDetails?.messages || []);
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
      <MainLayout
        chats={chats}
        selectedChat={selectedChat}
        messages={messages}
        onChatSelect={setSelectedChat}
        onCreate = {handleCreateChat}
      >
        <Chats
        />
      </MainLayout>
    </>
  );
}
