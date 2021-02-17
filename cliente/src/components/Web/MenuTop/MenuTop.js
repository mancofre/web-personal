import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo  from '../../../assets/img/png/logo-white3.png';
import {getMenuApi} from '../../../api/menu';
import SocialLinks from '../SocialLinks';

import './MenuTop.scss';

export default function MenuTop(){
    const [menuData, setMenuData] = useState([]);
console.log('este es el menu data ',menuData)
    useEffect(() =>{
        getMenuApi().then(response =>{
            console.log(response)
           const arrayMenu = [];
           response.menu.forEach(item => {
            item.active && arrayMenu.push(item);
          });

           setMenuData(arrayMenu);
        });
    },[]);

    return(
       <Menu className='menu-top-web' mode='horizontal'>
           
           <Menu.Item className='menu-top-web__logo'>
              <Link to={"/"}>
                  <img src={Logo} alt="Manuel Mercado Cofre"/>
              </Link>
           </Menu.Item>

           {menuData.map(item => {
               const external = item.url.indexOf("http") > -1 ? true : false;
               
               if(external){
                return (
                    <Menu.Item key={item._id} className="menu-top-web__item">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </Menu.Item>
                  );
               } 
               return (
                <Menu.Item key={item._id} className="menu-top-web__item">
                  <Link to={item.url}>{item.title}</Link>
                </Menu.Item>
              );
               
           })}

           {/*<Menu.Item className='menu-top-web__item'>
              <Link to={"/"}>Home</Link>
          </Menu.Item>

           <Menu.Item className='menu-top-web__logo'>
            <Link to={"/contacto"}>Contacto</Link>
          </Menu.Item>*/}

           <SocialLinks/>

       </Menu>
    )
}