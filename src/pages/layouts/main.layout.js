import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import {useNavigate} from 'react-router-dom';


const MainLayout = ({ children ,secure =false }) => {
    const [authenticateState, setAuthenticateState] = useState(null);
    const { state, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
  
    const navigate = useNavigate();
    if(secure && !state?.isAuthenticated){
       navigate("/sign-in");
    }

   
//   useEffect(() => {
//     if (state?.isAuthenticated) {
//       const getData = async () => {
//         const basicUserInfo = await getBasicUserInfo();
//         const idToken = await getIDToken();
//         const decodedIDToken = await getDecodedIDToken();

//         const authState = {
//           authenticateResponse: basicUserInfo,
//           idToken: idToken.split("."),
//           decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
//           decodedIDTokenPayload: decodedIDToken
//         };

//         setAuthenticateState(authState);
//       };

//       getData();
//     }
//   }, [state.isAuthenticated]);

  console.log("auth state",authenticateState)
    
    return (
        <div>
            <nav>
                {!state?.isAuthenticated && <button >
                    <Link to="/sign-in">Login</Link>
                </button>}
                {state?.isAuthenticated &&<button >
                    <Link to="/sign-out">Logout</Link>
                </button>}
            </nav>
            <div>{children}</div>
        </div>
    );
};

export default MainLayout;