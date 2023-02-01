import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import AdmPage from '../pages/AdmPage'
import ErrorPage from '../Error-page'
import RedirectUnity from "../pages/RedirectUnity"

import { ProtectedLayout } from '../pages/ProtectedLayout'
import { Courses } from "../pages/Courses"

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
      path: "/redirectUnit",
      element: 
      <ProtectedLayout>
        <RedirectUnity/>
      </ProtectedLayout>

    },
    {
      path: "/:idParamsUnity/adm/course",
      element: 
      <ProtectedLayout> 
        <AdmPage/> 
      </ProtectedLayout>,
    },
    {
      path: `/:idParams/courses`,
      element: <Courses/>
    }
  ]);

  return <RouterProvider router={router} />
}