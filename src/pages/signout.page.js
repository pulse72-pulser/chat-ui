
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function SignOutPage() {
    const { signOut } = useAuthContext();
    const navigate = useNavigate();


    useEffect(() => {
        signOut();
        navigate("/");
    },[signOut]);

    return (
        <></>
    );
}

export default SignOutPage;