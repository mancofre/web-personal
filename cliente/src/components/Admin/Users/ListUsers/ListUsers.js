 import React, { useState, useEffect } from 'react';
 import { Switch, List, Avatar, Button, Modal as ModalAntd, notification } from 'antd';
 import NoAvatar from '../../../../assets/img/png/no-avatar.png';
 import Modal from '../../../Modal';
 import EditUserForm from '../EditUserForm';
 import AddUserForm  from '../AddUserForm'
 import { getAvatarApi, activateUserApi, deleteUserApi } from '../../../../api/user';
 import { getAccessTokenApi } from '../../../../api/auth';

 import { 
        EditOutlined,
        StopOutlined,
        DeleteOutlined,
        CheckOutlined 
    } from '@ant-design/icons';

 import './ListUsers.scss';
 const { confirm } = ModalAntd;

export default function ListUsers(props){    
    
    const { usersActive, userInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true)
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    
    const addUserModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo usuario");
        setModalContent(
          <AddUserForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadUsers={setReloadUsers}
          />
        );
      };

    return(
        <div className='list-users'>
            <div className="list-users__header">
                <div className='list-users__header-switch'>
                    <Switch
                        defaultChecked
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />
                
                    <span>
                        {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
                    </span>
                </div>
                <Button type="primary" onClick={addUserModal}>
                    Nuevo usuario
                </Button>
            </div>
            {viewUsersActives ? 
                            <UsersActives 
                                userActives={usersActive}
                                setIsVisibleModal={setIsVisibleModal}
                                setModalTitle={setModalTitle}
                                setModalContent={setModalContent}
                                setReloadUsers={setReloadUsers}
                            /> 
                            : 
                            <UsersInactives UsersInactives={userInactive} setReloadUsers={setReloadUsers}/>}

        <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
        >
            {modalContent}
        </Modal>

        </div>
       
    );
}


function UsersActives(props){
    const { 
            userActives,
            setIsVisibleModal,
            setModalTitle,
            setModalContent,
            setReloadUsers
    } = props;

    const editUser = user =>{
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."}  
                              ${user.lastname ? user.lastname : "..."}`
                    );        
        setModalContent(
            <EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}  />
        );
       
    }

    return (
        <List
        className="users-active"
        itemLayout="horizontal"
        //loading={true}
        dataSource={userActives}
        renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers}/>}
    />
    )
}

function UserActive(props){
    const { user, editUser, setReloadUsers } = props; 
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
              });
        } else {
            setAvatar(null);
        }
    },[user]);

    const desactivateUser = () =>{
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, false)
            .then(response => {
                notification["success"]({
                    message: response
                  });
                setReloadUsers(true)
            })
            .catch(err =>{
                notification["error"]({
                    message: err
                })
            })
    }

    const showDeleteConfirm = () => {
        const accesToken = getAccessTokenApi();
        confirm({
            title: "Eliminando usuario",
            content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
              deleteUserApi(accesToken, user._id)
                .then(response => {
                  notification["success"]({
                    message: response
                  });
                  setReloadUsers(true);
                })
                .catch(err => {
                  notification["error"]({
                    message: err
                  });
                });
            }
          });
    }

    return(
        <List.Item 
                key={user._id}
                actions={[
                    <Button type="primary" onClick={() => editUser(user)}>
                        <EditOutlined />
                    </Button>,
                    <Button type="danger" onClick={ desactivateUser }>
                        <StopOutlined />
                    </Button>,
                    <Button type="danger" onClick={ showDeleteConfirm }>
                        <DeleteOutlined />
                    </Button>
                ]}
            >
                <List.Item.Meta
                    avatar= {<Avatar src={avatar ? avatar : NoAvatar}/>}
                    title={`
                        ${user.name ? user.name : '...'}
                        ${user.lastname ? user.lastname : '...'}
                    `}
                    description={user.email}
                />                   
                
            </List.Item>
    )
}

function UserInctive(props){
    const { user, setReloadUsers } = props; 
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
              });
        } else {
            setAvatar(null);
        }
    },[user]);

    const activateUser = () =>{
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, true)
            .then(response => {
                notification["success"]({
                    message: response
                })
                setReloadUsers(true)
            })
            .catch(err =>{
                notification["error"]({
                    message: err
                })
            })
    }

    const showDeleteConfirm = () => {
        const accesToken = getAccessTokenApi();
        confirm({
            title: "Eliminando usuario",
            content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
              deleteUserApi(accesToken, user._id)
                .then(response => {
                  notification["success"]({
                    message: response
                  });
                  setReloadUsers(true);
                })
                .catch(err => {
                  notification["error"]({
                    message: err
                  });
                });
            }
          });
    }

    return(
        <List.Item 
                key={user._id}
                actions={[
                    <Button type="primary" onClick={activateUser}>
                        <CheckOutlined />
                    </Button>,
                    <Button type="danger" onClick={ showDeleteConfirm }>
                        <DeleteOutlined />
                    </Button>
                ]}
            >
                <List.Item.Meta
                    avatar= {<Avatar src={avatar ? avatar : NoAvatar}/>}
                    title={`
                        ${user.name ? user.name : '...'}
                        ${user.lastname ? user.lastname : '...'}
                    `}
                    description={user.email}
                />                   
                
            </List.Item>
    )
}

function UsersInactives(props){    
    const { UsersInactives, setReloadUsers } = props;

    
    return (
        <List
        className="users-active"
        itemLayout="horizontal"
        //loading={true}
        dataSource={UsersInactives}
        renderItem={user => <UserInctive user={user} setReloadUsers={setReloadUsers}/> }
    />
    )
}