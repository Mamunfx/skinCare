import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Layouts/Home';
import Root from './Layouts/Root';

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
import UpdateQue from './Layouts/UpdateQue';
import Private_Route from './Components/PrivateRoute';

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
        element:<AllQue></AllQue>,
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
        element:<Private_Route><RcForMe></RcForMe></Private_Route>,
      },
      {
        path:"/Myque",
        element:<Private_Route><Myque></Myque></Private_Route>,
      },
      {
        path:"/MyReco",
        element:<Private_Route><MyReco></MyReco></Private_Route>,
      },
      {
        path:"/AddQue",
        element:<Private_Route><AddQue></AddQue></Private_Route>,
      },
      {
        path:"/QueDetails/:id",
        element:<Private_Route><QueDetails></QueDetails></Private_Route>,
      },
      {
        path:"/UpdateQue/:id",
        element:<Private_Route><UpdateQue></UpdateQue></Private_Route>,
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
