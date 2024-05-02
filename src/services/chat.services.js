import axios from 'axios';

const BASE_URL = 'https://e87c6b5f-8e8f-4d2d-ae89-0bf06baeab5b-prod.e1-us-east-azure.choreoapis.dev/chatapp/chatservice/chat-service-5c6/v1.2';

const getChats =async(token)=> {
    if(!token) throw new Error('Token is required');

    // const response = await axios.get(`${BASE_URL}/chats`);
    const response = await axios.get(`${BASE_URL}/chats`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

const createChat = async (token, newChat) => {
    if (!token) {
        throw new Error('Token is required');
    }

    try {
        const response = await axios.post(`${BASE_URL}/chats`, newChat, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error; // Consider enhancing this to handle specific cases or sanitize data
    }
};

const sendMessage = async (token, message) => {
    if (!token) {
        throw new Error('Token is required');
    }

    try {
        const response = await axios.post(`${BASE_URL}/messages`, message, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error; // Consider enhancing this to handle specific cases or sanitize data
    }
};

const getChatById = async (chatId, token) => {
    if (!token) {
        throw new Error('Token is required');
    }

    try {
        const response = await axios.get(`${BASE_URL}/chats/${chatId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw new Error('Failed to fetch chat');
    }
};



export {
    getChats, createChat, sendMessage, getChatById
};