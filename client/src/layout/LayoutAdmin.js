import React,{useState} from "react";
import { Route,Routes,useNavigate ,Navigate} from "react-router-dom";
import { Layout } from "antd";
import "./LayoutAdmin.scss";


import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider"
import  AdminSingIn from "../pages/Admin/SignIn/SignIn";
import { getAccesToken } from "../api/auth";
import userAuth from "../hooks/userAuth";



export default function LayoutAdmin(props)
{
    
    

    const [menuCollapsed,setMenuCollapsed]=useState(false);
    const {children}= props;
    const {Header,Content,Footer}= Layout;
    const { user,isLoading}=userAuth();
    // let navigate = useNavigate();
    // console.log(user);
    // console.log(isLoading);
    
    if (!user && !isLoading) 
    {
       
        //  navigate('/admin/login')
        return (
            
             <Layout>
                 {/* <Navigate to="/admin/login" /> */}
             
              <Content>{<AdminSingIn/>}</Content>  
    
             </Layout>
        );
    }
      

         if (user && !isLoading)
         {

    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed} />
             
             <Layout className="layout-admin" style={{marginLeft: menuCollapsed?"80px":"200px"}}>
                 <Header className="layout-admin__header">
                     <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
                 </Header>
                 <Content  className="layout-admin__content">{children}
                 </Content> 
                 <Footer  className="layout-admin__footer">Footer</Footer>
             </Layout>

        </Layout>
        
        
        

   
        ); }
        return null
        }
