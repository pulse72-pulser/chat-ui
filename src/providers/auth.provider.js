import React from "react";
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
    //   signInRedirectURL: "http://localhost:3000/chats",
    //     signOutRedirectURL: "http://localhost:3000/",
    // developemnt 
//     signOutRedirectURL: "https://37566d18-8521-4284-abb8-1ab716473b8c.e1-us-east-azure.choreoapps.dev/",
//    signInRedirectURL: "https://37566d18-8521-4284-abb8-1ab716473b8c.e1-us-east-azure.choreoapps.dev/chats",
    // production 
    signOutRedirectURL: "https://009171b2-6d99-4524-ac73-de4e43f6744e.e1-us-east-azure.choreoapps.dev/",
    signInRedirectURL: "https://009171b2-6d99-4524-ac73-de4e43f6744e.e1-us-east-azure.choreoapps.dev/chats", 
    clientID: "CMFfmVLc4aGP_1EV8U8mcBaAmF4a",
     baseUrl: "https://api.asgardeo.io/t/cybersynced",
     scope: [ "openid","profile" ]
};


export const Auth = ({ children }) => {
    return (
        <AuthProvider config={config}>
            {children}
        </AuthProvider>
    );
}