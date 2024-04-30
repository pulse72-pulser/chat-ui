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


export {
    getChats
}