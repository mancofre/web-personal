import React, {useState} from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined,LockFilled } from '@ant-design/icons';

import './RegisterForm.scss';
import FormItem from 'antd/lib/form/FormItem';
import {
    emailValidation,
    minLengthValidation
  } from "../../../utils/formValidation";

import { signUpApi } from "../../../api/user";

export default function RegisterForm(){
    
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
      });
    
      const [formValid, setFormValid] = useState({
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

    const register = async (e) =>{    

        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
        } else {
        if (passwordVal !== repeatPasswordVal) {
            notification["error"]({
            message: "Las contraseñas tienen que ser iguales."
            });
        } else {
            const result = await signUpApi(inputs);
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

    const resetForm = () => {
        const inputs = document.getElementsByTagName("input");

        for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("success");
        inputs[i].classList.remove("error");
        }

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
    };

    return (
        <Form name="form" onFinish={evt => register(evt)} className="register-form" onChange={changeForm} action="#"> 
            <FormItem>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,.30)"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="register-form__input"
                    value={inputs.email}
                    onChange={inputValidation}
                />
            </FormItem>
            <FormItem>           
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,.30)"}} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    value={inputs.password}
                    onChange={inputValidation}
                />
            </FormItem>
            <FormItem>
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,.30)"}} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register-form__input"
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                />
            </FormItem>
            <FormItem>
                <Checkbox name="privacyPolicy" onChange={inputValidation} checked={inputs.privacyPolicy}>
                    He leido y acepto las politicas de Seguridad.
                </Checkbox>
            </FormItem>
            <FormItem>
            <Button htmlType="submit" className="register-form__button">
                Crear cuenta
            </Button>
            </FormItem>
        </Form>
    );    
}