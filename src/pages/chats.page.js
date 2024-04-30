import Chats from "../components/chats";
import MainLayout from "./layouts/main.layout";
import {useNavigate} from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect ,useState} from "react";

import { getChats } from '../services/chat.services';

export default function ChatsPage() {
  const { state, signOut, getBasicUserInfo, getIDToken,getAccessToken, getDecodedIDToken } = useAuthContext();
  const navigate = useNavigate();

  if(!state?.isAuthenticated){
    navigate("/");
  }

  const [chats, setChats] = useState([]);

    //   if (state?.isAuthenticated) {
  //     const getData = async () => {
  //       const basicUserInfo = await getBasicUserInfo();
  //       const idToken = await getIDToken();
  //       const decodedIDToken = await getDecodedIDToken();

  //       const authState = {
  //         authenticateResponse: basicUserInfo,
  //         idToken: idToken.split("."),
  //         decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
  //         decodedIDTokenPayload: decodedIDToken
  //       };

  //       // setAuthenticateState(authState);
  //     };

  useEffect(() => {
    const getData = async () => {
      if(state?.isAuthenticated) {
        
        try{
          // const token = await getIDToken();
          const token = await getAccessToken();
          // console.log("access token", token)
          const chats = await getChats(token);
          console.log(chats);
          setChats(chats?.chats);
        }catch(e){
          console.error(e);
        }
       

  //       const idToken = await getIDToken();
  //       const decodedIDToken = await getDecodedIDToken();
      }

    };
    getData();
  }, []);

    return (
      <>
        <MainLayout
          chats={chats}
        >
        <Chats 
        />
        </MainLayout>
      </>
    );
  } 