import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import SignIn from '../pages/signin/SignIn';
import SignUp from '../pages/signup/SignUp';
import Home from '../pages/home/Home';
import NotFound from '../pages/notfound/Notfound';
import Admin from '../pages/admin/Admin';
import Navbar from '../components/navbar/Navbar';
import SingleBook from '../pages/singlebook/SingleBook';

function AllRoutes() {
  const PrivateRoute = ({ children }) => {
    const isAuth = localStorage.getItem("token");
    return isAuth === null ? <Navigate to="/" /> : <>{children}</>;
  };
  const data = localStorage.getItem('user')
  const user = JSON.parse(data)
  console.log('userdata: ', user);
  const publicRoutes = [
    {
      path: "/",
      component: <SignIn />
    },
    {
      path: "/signup",
      component: <SignUp />
    }
  ]
  const adminRoutes = [
    {
      path: "/admin",
      component: <Admin />
    },
  ]
  const userRoutes = [
    {
      path: "/home",
      component: <Home />
    },
    {
      path: "/book",
      component: <SingleBook />
    }
  ]
  return (
    <>
      <Navbar />
      <Routes>
        {/* {!user && publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.component} />;
        })}
        {user && userRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.component} />;
        })}
        {user && (user?.role === 'Admin') && adminRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.component} />;
        })} */}
        <Route path='/' Component={SignIn} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/home' element={<PrivateRoute> <Home />  </PrivateRoute>} />
        <Route path='/book' element={<PrivateRoute> <SingleBook />  </PrivateRoute>} />

        <Route path='/admin' element={<PrivateRoute> <Admin />  </PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes></>

  )
}

export default AllRoutes