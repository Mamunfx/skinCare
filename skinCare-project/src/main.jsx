import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Layouts/Home';
import Root from './Layouts/Root';
import AuthProvider from './AuthProvider';
import Queries from './Layouts/Queries';

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
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
