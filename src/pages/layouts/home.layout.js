import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography ,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const HomeLayout = ({ children ,state=null}) => {

    const navigate = useNavigate();

    
   
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

  // console.log("auth state",authenticateState)
  const handleLogin = () => {
      navigate("/sign-in");
  }
    
    return (
        <div>
            <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% )` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          // onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {/* {!state?.isAuthenticated && <button >
                    <Link to="/sign-in">Login</Link>
                </button>}
                {state?.isAuthenticated &&<button >
                    <Link to="/sign-out">Logout</Link>
                </button>} */}
        <Typography variant="h6" noWrap component="div">
          Pulser
        </Typography>
        <Button color="inherit" onClick={handleLogin}>Login</Button>

      </Toolbar>
    </AppBar>
            <div>{children}</div>
        </div>
    );
};

export default HomeLayout;