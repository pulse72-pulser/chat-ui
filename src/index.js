import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter ,RouterProvider} from 'react-router-dom';
import HomePage from './pages/home.page';
import ChatsPage from './pages/chats.page';
import SignInPage from './pages/signin.page';
import SignOutPage from './pages/signout.page';

import { Auth } from './providers/auth.provider';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/chats',
    element:<ChatsPage/>,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/sign-out',
    element: <SignOutPage />,
    errorElement: <div>404 Not Found</div>
  
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth>
    <RouterProvider router={router}/>
    </Auth>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
