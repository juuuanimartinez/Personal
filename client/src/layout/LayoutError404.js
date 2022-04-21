import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

//import "./LayoutBasic.scss"


export default function LayoutError404(props)
{
    const {children}= props;
    const {Content,Footer}= Layout;
    return (
        <Layout>
             
                 <Content>{children}</Content> 
                 
             

        </Layout>
        

   
        );
}



