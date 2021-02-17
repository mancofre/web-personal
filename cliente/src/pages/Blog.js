import React from 'react'
import { Row, Col }  from 'antd';
import { useParams, withRouter }  from 'react-router-dom';
import PostListWeb  from '../components/Web/Blog/PostListWeb';
import PostInfo  from '../components/Web/Blog/PostInfo';

export default function Blog(props) {
    const { location, history } = props;
    const { url } = useParams();
    return (
       <Row>
           <Col md={2}/>
           <Col md={20}>
                { url ? (
                        <PostInfo url={url}/>
                    ):(
                        <PostListWeb location={location} history={history}/>
                    )
                }
           </Col>
           <Col md={2}/>
           
       </Row>
    )
}
