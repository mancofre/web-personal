import React, {useState} from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import LayoutAdminStyle from './LayoutAdminStyle.scss';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';

export default function LayoutAdmin(props){
    
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;

    const { user, isLoading } = useAuth();
 
    if(!user && !isLoading){
        return(
            <>
            <Route path="/admin/login" component={AdminSignIn} />
            <Redirect to="/admin/login"/>
            </>
        )
    }

    if(user && !isLoading){
        return(
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed}/>
                <Layout className="layout-admin"
                    style={{marginLeft: menuCollapsed ? "80px" : "200px"}}
                >

                    <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
                    </Header>

                    <Content className="layout-admin__content">
                        <LoadRuoters routes={routes} />
                    </Content>

                    <Footer className="layout-admin__footer">
                        Manuel Mercado 2021
                    </Footer>

                </Layout>
            </Layout>
        );
    }

    return null;
}

function LoadRuoters({routes}){  
    return(
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}