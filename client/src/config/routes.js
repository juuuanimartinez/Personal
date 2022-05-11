//Layout
import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutBasic from "../layout/LayoutBasic";
//Admin Pages
import AdminHome from "../pages/Admin";
import  AdminSingIn from "../pages/Admin/SignIn/SignIn";
import AdminUsers  from "../pages/Admin/Users/Users";

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
             },
             {
                 path:"/admin/users",
                 Layout:LayoutAdmin,
                 component:AdminUsers

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