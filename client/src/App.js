
import React from 'react';
import {BrowserRouter,Routes,Route } from "react-router-dom";
import routes from './config/routes';
import MenuTop from './components/Admin/MenuTop';
import './App.scss';
import  AdminSingIn from "./pages/Admin/SignIn/SignIn";
import AuthProvider from './providers/AuthProviders';



function App() 
{
  return(
    <AuthProvider>
    <BrowserRouter>
    <Routes>
       {routes.map((route,index)=>( 
         
         
        
       <Route 
           key={index} 
           path={route.path} 
           element={<route.Layout><route.component/></route.Layout>}
        />
       
       ))} 
       
       

       {/* {<Route path='/login' element={<AdminSingIn/>} /> } */}
    </Routes>
    </BrowserRouter>
    </AuthProvider>

  );

 
  
}




export default App;
