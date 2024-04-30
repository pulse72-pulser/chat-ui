import Home from '../components/home';
import HomeLayout from './layouts/home.layout';
import { useAuthContext } from "@asgardeo/auth-react";
import {useNavigate} from 'react-router-dom';
import React,{useState,useEffect} from 'react';

import { getInfo } from '../services/info.service';

export default function HomePage() {
  // const [authenticateState, setAuthenticateState] = useState(null);
  const { state, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
  const navigate = useNavigate();

  if(state?.isAuthenticated){
    navigate("/chats");
  }

  const [info, setInfo] = useState(null);
  
  // useEffect(() => {
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

  //     getData();
  //   }
  // }

  useEffect(() => {
    // async function for getInfo 
    const fetchData = async () => {
      const data = await getInfo();
      // console.log(data);
      setInfo(data);
    };
    fetchData();
  }, []);

  return (
    <>
    <HomeLayout>
      <Home 
        info={info}
      />
    </HomeLayout>
    </>
  );
}