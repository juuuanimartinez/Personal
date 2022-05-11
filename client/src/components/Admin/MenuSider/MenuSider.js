import React from "react";
import {Link,withRouter,useLocation} from "react-router-dom";
import { Layout,Menu } from "antd";
import {HomeOutlined,MenuOutlined,UserOutlined,} from '@ant-design/icons';

import "./MenuSider.scss"

export default function MenuSider (props)

{
    const {Sider}=Layout;
    const {menuCollapsed}= props;
    const {pathname} = useLocation();
    //Tambien se podria  nombrar el componente como layaut.Sider
    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}> 
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["pathname"]}>
                <Menu.Item  key="/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item  key="/admin/users">
                    <Link to={"/admin/users"}>
                    <UserOutlined />
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>

    )
}