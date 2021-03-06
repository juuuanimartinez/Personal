import React from "react";
import "./SignIn.scss";
import { Layout,Tabs } from "antd";
import { Navigate } from "react-router-dom";
import RegisterForm from "../../../components/Admin/RegisterForm";
import Logo from "../../../assets/img/png/logo-white.png";
import LoginForm from "../../../components/Admin/LoginForm/LoginForm.js";
import { getAccessTokenApi } from "../../../api/auth";



export default function SignIn()
{   const {Content}=Layout;
    const {TabPane}= Tabs;
    if(getAccessTokenApi())
    {
        return <Navigate to="/admin" />
    }
    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">

                <img  src={Logo} alt="Juan Manuel Martinez"/>
                </h1>

                <div className="sign-in__content-tabs">
                    <Tabs type="card">

                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                            
                        </TabPane>
                        <TabPane tab={<span>Nuevo Usuario</span>} key="2" >
                            <RegisterForm/>
                        </TabPane>


                    </Tabs>

                </div>

            </Content>

        </Layout>
    );
}
