import React,{useState} from "react";
import "./RegisterForm.scss";
import {Form,Input,Checkbox,Button,notification} from "antd"
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import {emailValidation,minLengthValidation} from "../../../utils/formValidation";
import { signUpApi} from "../../../api/user";

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false
    });
     const [formValid, setFormValid]=useState({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
    });

    const changeForm = e => {
        if (e.target.name === "privacyPolicy") {
          setInputs({
            ...inputs,
            [e.target.name]: e.target.checked
            
          });
        } else {
          setInputs({
            ...inputs,
            [e.target.name]: e.target.value
          });
        }
      };

      const inputValidation = e => {
        const { type, name } = e.target;
    
        if (type === "email") {
          setFormValid({ ...formValid, [name]: emailValidation(e.target) });
        }
        if (type === "password") {
          setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
        }
        if (type === "checkbox") {
          setFormValid({ ...formValid, [name]: e.target.checked });
        }
      };
      const register  =  async e  =>
      {
          e.preventDefault();
          
          const emailVal=inputs.email;
          const privacyPolicyVal= inputs.privacyPolicy;
          const passwordVal =inputs.password;
          const repeatPasswordVal = inputs.repeatPassword;
         
          if(!emailVal|| !passwordVal || !repeatPasswordVal || !privacyPolicyVal)
          {
            notification["error"]({
              message:"Todos los campos son obligatorios"
            });
            
          }
          else
            {
              if(passwordVal !== repeatPasswordVal)
              {
                notification["error"]({
                  message:"Las contraseñas no son iguales"
                });
              }
              else{
                const result =  await signUpApi(inputs);
                if (!result.ok) {
                  notification["error"]({
                    message: result.message
                  });
                } else {
                  notification["success"]({
                    message: result.message
                  });
                  resetForm();
                  
                }

              }
             
            }
      };
      const resetForm= () =>
      {
        const inputs= document.getElementsByTagName("Input")
        for(let i=0 ;i<inputs.length;i++)
        {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");

            setInputs({
              email: "",
              password: "",
              repeatPassword: "",
              privacyPolicy: false
            });
            setFormValid({
              email: false,
              password: false,
              repeatPassword: false,
              privacyPolicy: false
            });
        }
      }
   
    return (
        <Form className="register-form"  onSubmitCapture={register} onChange={changeForm}>
            <Form.Item>
            <Input
            
            prefix={<UserOutlined  type="user" className="register-form__icono-input" style={{color:"rgba(0,0,0,.25)"}}/>}
            type="email"
            name="email"
            placeholder="Correo electronico"
            className="register-form__input" 
            onChange={inputValidation}
            value={inputs.email}
            />
            </Form.Item>

            <Form.Item>
                <Input
                 prefix={<LockOutlined  type="lock" className="register-form__icono-input" style={{color:"rgba(0,0,0,.25)"}}/>}
                 type ="password"
                 name="password"
                 placeholder="Contraseña"
                 className="register-form__input"
                 onChange={inputValidation}
                 value={inputs.password}

                />
                
            </Form.Item>
            <Form.Item>
                <Input
                 prefix={<LockOutlined  type="lock" className="register-form__icono-input" style={{color:"rgba(0,0,0,.25)"}}/>}
                 type ="password"
                 name="repeatPassword"
                 placeholder="Repita Contraseña"
                 className="register-form__input"
                 onChange={inputValidation}
                 value={inputs.repeatPassword}

                />

            </Form.Item>
            <Form.Item >
                <Checkbox name="privacyPolicy"  className="register-form__check" checked={inputs.privacyPolicy} onChange={inputValidation}>
                    Lei y acepto las politicas de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">Crear Cuenta</Button>
            </Form.Item>
            
        </Form>
    )
}