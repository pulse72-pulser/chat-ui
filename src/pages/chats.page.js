import Chats from "../components/chats";
import MainLayout from "./layouts/main.layout";
import {useNavigate} from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";

import { getChats } from '../services/chat.services';

export default function ChatsPage() {
  const { state, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
  const navigate = useNavigate();

  if(!state?.isAuthenticated){
    navigate("/");
  }

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
          const token = await getIDToken();
          const chats = await getChats(token);
          console.log(chats);
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
        <MainLayout>
        <Chats />
        </MainLayout>
      </>
    );
  } 