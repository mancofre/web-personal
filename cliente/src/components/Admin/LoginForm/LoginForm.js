import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined,LockFilled } from '@ant-design/icons';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants'
import './LoginForm.scss'
import {
    emailValidation,
    minLengthValidation
  } from "../../../utils/formValidation";

  import { signInApi } from "../../../api/user"; 

export default function LoginForm(){
    const [inputs, setInputs] = useState({
        email: "",
        password:""
    });

    const changeForm = e =>{
       setInputs({
           ...inputs,
           [e.target.name]: e.target.value
       });
    }

    const login = async () => {

        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        
        if (!emailVal || !passwordVal) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
        }else{
            const result = await signInApi(inputs);
            if(result.message){
                notification["error"]({
                    message: result.message
                });
            } else {
                const {accessToken, refreshToken} = result;
                localStorage.setItem(ACCESS_TOKEN,accessToken);
                localStorage.setItem(REFRESH_TOKEN,refreshToken);

                notification["success"]({
                    message: "Login correcto."
                });

                window.location.href = '/admin';
            }
        }
    }
    
    return (
        <Form className="login-form" onChange={changeForm} onFinish={login}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,.30)"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="login-form__input"
                
                />
            </Form.Item>
            <Form.Item>           
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,.30)"}} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                    
                />
            </Form.Item>
            <Form.Item>
            <Button htmlType="submit" className="login-form__button">
                Login
            </Button>
            </Form.Item>
        </Form>
    );
}