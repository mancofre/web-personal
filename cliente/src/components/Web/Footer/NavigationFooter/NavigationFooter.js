import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ReadOutlined,
        CodepenOutlined,
        DatabaseOutlined,
        RightOutlined,
        HddOutlined,
        AppstoreAddOutlined,
        UserOutlined,
        DoubleRightOutlined 
    } from '@ant-design/icons';

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col>
        <h3>Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="#">
        <ReadOutlined /> Cursos Online
        </a>
      </li>
      <li>
        <a href="#">
        <CodepenOutlined /> Desarrollo Web
        </a>
      </li>
      <li>
        <a href="#">
        <DatabaseOutlined /> Base de Datos
        </a>
      </li>
      <li>
        <a href="#">
          <RightOutlined /> Politica de Privacidad
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
        <HddOutlined /> Sistemas / Servidores
        </a>
      </li>
      <li>
        <a href="#">
        <AppstoreAddOutlined /> CMS
        </a>
      </li>
      <li>
        <a href="#">
        <UserOutlined /> Porfolio
        </a>
      </li>
      <li>
        <a href="#">
        <DoubleRightOutlined /> Política de Cookies
        </a>
      </li>
    </ul>
  );
}