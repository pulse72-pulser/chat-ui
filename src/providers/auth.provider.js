import React from "react";
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
     signInRedirectURL: "http://localhost:3000/chats",
     signOutRedirectURL: "http://localhost:3000/",
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