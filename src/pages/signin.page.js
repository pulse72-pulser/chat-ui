
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function SignInPage() {
    const { signIn,state } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(state?.isAuthenticated){
            navigate("/chats");
        }
        signIn(); 
    },[signIn,state?.isAuthenticated]);


    return (
        <></>
    );
}

export default SignInPage;