//Layout
import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutBasic from "../layout/LayoutBasic";
//Admin Pages
import AdminHome from "../pages/Admin";
// import AdminSignIn from "../pages/Admin/SignIn";
import  AdminSingIn from "../pages/Admin/SignIn/SignIn";

//Pages
import  Home from "../pages/Home";
import Contact from "../pages/Contact";


//Other
import Error404 from "../pages/Error404";


 const routesAdmin=
 [
     
        
             {
                 path:"/admin",
                 Layout:LayoutAdmin,
                 component:AdminHome,
                 

             },

             {
                 path:"/admin/login",
                 Layout:LayoutAdmin,
                 component:AdminSingIn,
               

             },
             {
                 path:"*",
                 Layout:LayoutAdmin,
                 component:Error404,
             }
         

     
    
    
 ];

 const routesClient=[
     {
         path:"/",
         Layout:LayoutBasic,
         component:Home
     },
     {
         path:"/contact",
         Layout:LayoutBasic,
         component:Contact
     }
 ];

 const routes = [...routesAdmin,...routesClient];
 

 export default routes;