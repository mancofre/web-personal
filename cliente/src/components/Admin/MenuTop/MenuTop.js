import React from 'react';
import {Button} from 'antd';
import { MenuUnfoldOutlined,LogoutOutlined,MenuFoldOutlined } from '@ant-design/icons';
import './MenuTop.scss';
import LanuLogo from  '../../../assets/img/png/logo-white3.png';
import {logout} from '../../../api/auth';
export default function MenuTop(props){
   // console.log(props)
    const {menuCollapsed, setMenuCollapsed} = props;

    const logoutUser = () =>{
        logout(); 
        window.location.reload();
        
    }
    return(
        <div className="menu_top">
           <div className="menu_top__left">
                <img 
                    className="menu_top__left-logo"
                    src={LanuLogo}
                    alt="Manuel Mercado"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                { menuCollapsed ?  <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    
                </Button>
           </div>

           <div className="menu_top__right">
                <Button type="link" onClick={logoutUser}>
                    <LogoutOutlined />
                </Button>
           </div>
        </div>
    )
}