import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Layouts/Home';
import Root from './Layouts/Root';

import Queries from './Layouts/Queries';
import Login from './Layouts/Login';
import Signup from './Layouts/Singup';
import AuthProvider from './AuthProvider';
import RcForMe from './Layouts/RcForMe';
import Myque from './Layouts/Myque';
import MyReco from './Layouts/MyReco';
import AddQue from './Layouts/AddQue';
import AllQue from './Layouts/AllQue';
import QueDetails from './Layouts/QueDetails';
import NotFound from './Layouts/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"",
        element:<Home></Home>,
      },
      {
        path:"/Queries",
        element:<Queries></Queries>,
      },
      {
        path:"/login",
        element:<Login></Login>,
      },
      {
        path:"/Signup",
        element:<Signup></Signup>,
      },
      {
        path:"/RcForMe",
        element:<RcForMe></RcForMe>,
      },
      {
        path:"/Myque",
        element:<Myque></Myque>,
      },
      {
        path:"/MyReco",
        element:<MyReco></MyReco>,
      },
      {
        path:"/AddQue",
        element:<AllQue></AllQue>,
      },
      {
        path:"/QueDetails",
        element:<QueDetails></QueDetails>,
      },
    ]
  },
  {
    path:'*',
    element:<NotFound></NotFound>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
