import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
// import { useAuthContext } from "@asgardeo/auth-react";

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from '../../components/Sidebar';
import MainContent from '../../components/MainContent';
import NavBar from '../../components/Navbar';


const MainLayout = ({ children }) => {
    // const [authenticateState, setAuthenticateState] = useState(null);
    // const { state, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    // const navigate = useNavigate();

    // if(secure && !state?.isAuthenticated){
    //    navigate("/sign-in");
    // }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    

   
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

//   console.log("auth state",authenticateState)
    
    return (
        <div>
            <NavBar
                // onSignOut={signOut}
            />
            {/* <nav>
                {!state?.isAuthenticated && <button >
                    <Link to="/sign-in">Login</Link>
                </button>}
                {state?.isAuthenticated &&<button >
                    <Link to="/sign-out">Logout</Link>
                </button>}
            </nav> */}
                <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar handleDrawerToggle={handleDrawerToggle} />
      <SideBar mobileOpen={mobileOpen} handleDrawerClose={() => setMobileOpen(false)} />
      <MainContent />
    </Box>

            <div>{children}</div>
        </div>
    );
};

export default MainLayout;