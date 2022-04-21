import React,{useState} from "react";
import{Form,Input,Button,notification} from "antd";
import {UserOutlined,LockOutlined, WindowsFilled} from '@ant-design/icons';
import "./LoginForm.scss";
import Password from "antd/lib/input/Password";
import { signInApi } from "../../../api/user";
import{ACCES_TOKEN,REFRESH_TOKEN} from "../../../utils/constant";


export default function LoginForm()
{ const [inputs,setInputs] =useState({
    email:"",
    password:""
});
 const changeForm = e =>{
     setInputs({
         ...inputs,
         [e.target.name]:e.target.value
     });

 };

 const login = async e =>
 {
     e.preventDefault();
  const result= await signInApi(inputs);
  

  if(result.message)
  {
      notification["error"]({
        message:result.message
      });
  }
  else{
    const { accessToken, refreshToken } = result;
    
    localStorage.setItem(ACCES_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    

    notification["success"]({
      message: "Login correcto."
    });
        //    window.location.href="/admin";
  }
 };
 

 
    return (
        <Form className="login-form" onSubmitCapture={login} onChange={changeForm}>
            <Form.Item>
             <Input
                prefix= {<UserOutlined type="user" className="login-form__icono-input" style={{color: "rgba(0,0,0,0.25)"}} />}
                type= "email"
                name="email"
                placeholder="Correo Electronico"
                className="login-form__input"
            
            />
                
            </Form.Item>
            
            <Form.Item>
             <Input
                prefix= {<LockOutlined type="lock" className="login-form__icono-input" style={{color: "rgba(0,0,0,0.25)"}} />}
                type="password"
                name="password"
                placeholder="Password"
                className="login-form__input"
            
             />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">Entrar</Button>
            </Form.Item>
        </Form>
    );
}