import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import AdmPage from '../pages/AdmPage'
import ErrorPage from '../Error-page'

import { ProtectedLayout } from '../pages/ProtectedLayout'

export function Routes (){
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/login",
      element: <Login/>
  
    },
    {
      path: "/admpage",
      element: 
      <ProtectedLayout> 
        <AdmPage/> 
      </ProtectedLayout>,
    }
  ]);

  return <RouterProvider router={router} />
}