import React from 'react';
import { Modal as ModalAntd } from 'antd';

import './Modal.scss';

export default function Modal(props){
    
    const { children, title, isVisible, setIsVisible, ...other } = props;
    
    return(
        <ModalAntd
            visible={isVisible}
            title={title}
            centered            
            onCancel={()=>setIsVisible(false)}
            footer={false}
            {...other}
        >
        {children}
    </ModalAntd>
    )
    
    
}
