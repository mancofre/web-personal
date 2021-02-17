import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout,Menu, Button } from 'antd';
import { HomeOutlined,MenuOutlined,UserAddOutlined,ProfileOutlined, MessageOutlined } from '@ant-design/icons';

import './MenuSider.scss';


function MenuSider(props){
    
    const {menuCollapsed, location} = props;    
    const {Sider} = Layout;
    
    return(
       <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <UserAddOutlined />
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/menu">
                    <Link to={"/admin/menu"}>
                        <MenuOutlined />
                        <span className="nav-text">Menu Web</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/courses">
                    <Link to={"/admin/courses"}>
                         <ProfileOutlined />
                        <span className="nav-text">Courses</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/blogs">
                    <Link to={"/admin/blogs"}>
                        <MessageOutlined />
                        <span className="nav-text">Blogs</span>
                    </Link>
                </Menu.Item>

            </Menu>
       </Sider>
    );
}

export default withRouter(MenuSider);