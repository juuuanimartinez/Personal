import { Menu } from "antd";
import { Button,Layout } from "antd";
import { MenuUnfoldOutlined,MenuFoldOutlined,PoweroffOutlined} from '@ant-design/icons';
import React from "react";
import {Link} from "react-router-dom";
import "./MenuTop.scss";
import logo from "../../../assets/img/png/logo-white.png"


export default function MenuTop(props){
    const {menuCollapsed,setMenuCollapsed}=props;
    return (

         <div className="menu-top">
             <div className="menu-top__left">
             <Link to={"/admin"}>
                 <img className="menu-top__left-logo"
                 src={logo}
                 alt="Juan Manuel Martinez"
                 
                  />
                 </Link>

                 <Button type="link" onClick={()=> setMenuCollapsed(!menuCollapsed)}>
                     {menuCollapsed?<MenuFoldOutlined /> :<MenuUnfoldOutlined />}
                    
                     </Button>

             </div>
             <div className="menu-top__right">
                 <Button type="link" onClick={()=> console.log("Apagado")} ><PoweroffOutlined />
                 </Button>
             </div>
            
         </div>
     )
}