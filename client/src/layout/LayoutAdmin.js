import React,{useState} from "react";
import { Route,Routes,useNavigate } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutAdmin.scss";


import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider"
import  AdminSingIn from "../pages/Admin/SignIn/SignIn";
import { getAccesToken } from "../api/auth";


export default function LayoutAdmin(props)
{
    const token=getAccesToken();
    console.log(token);

    const [menuCollapsed,setMenuCollapsed]=useState(false);
    const {children}= props;
    const {Header,Content,Footer}= Layout;
    let navigate = useNavigate();
    const user="";
    if (!user) {

         navigate('/admin/login')
        return (
            
             <Layout>
             
              <Content>{<AdminSingIn/>}</Content>  
    
             </Layout>
        );
      }
      else{

      
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
        
        

   
        );}}
