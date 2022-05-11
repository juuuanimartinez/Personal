import { Menu } from "antd";
import { Button,Layout } from "antd";
import { MenuUnfoldOutlined,MenuFoldOutlined,PoweroffOutlined} from '@ant-design/icons';
import React from "react";
import {Link} from "react-router-dom";
import "./MenuTop.scss";
import logo from "../../../assets/img/png/logo-white.png"
import {logout} from "../../../api/auth"

const logoutUser= ()=>

{
    window.location.reload();
    logout();
}
export default function MenuTop(props){
    const {menuCollapsed,setMenuCollapsed}=props;
    return (

         <div className="menu-top">
             <div className="menu-top__left">
             
                 <img className="menu-top__left-logo"
                 src={logo}
                 alt="Juan Manuel Martinez"
                 
                  />
                 

                 <Button type="link" onClick={()=> setMenuCollapsed(!menuCollapsed)}>
                     {menuCollapsed?<MenuFoldOutlined /> :<MenuUnfoldOutlined />}
                    
                     </Button>

             </div>
             <div className="menu-top__right">
                 <Button type="link" onClick={ logoutUser} ><PoweroffOutlined />
                 </Button>
             </div>
            
         </div>
     )
}