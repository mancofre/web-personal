import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Route, Switch } from "react-router-dom";
import MenuTop from '../components/Web/MenuTop';
import Footer  from '../components/Web/Footer';

//import LayoutBasicStyle from './LayoutBasicStyle.scss';

export default function LayoutBasic(props){
    const {routes} = props;

    //const {Header, Content} = Layout;
    
    return(
        <>
        <Row>
            <Col lg={2} />
            <Col lg={20}>
                <MenuTop />
                
            </Col>

            <Col lg={2} />
            
        </Row>
        <LoadRuoters routes={routes} />
        <Footer/>
        </>
    )

    /*return(
        <Layout>
        <h2>Menu Sider Basic</h2>
        <Layout>

            <Header>
                Header...
            </Header>

            <Content>
                <LoadRuoters routes={routes} />
            </Content>

            <Footer>
                Manuel Mercado 2021 basic
            </Footer>

        </Layout>
    </Layout>
    );*/
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