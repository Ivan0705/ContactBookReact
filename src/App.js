import {Button, Layout, Table} from 'antd';
import React, {Fragment, useState} from 'react';
import 'antd/dist/antd.css';
import {DeleteOutlined, PlusCircleFilled} from '@ant-design/icons';
import AddDrawer from "./Components/ComponentContainer/AddDrawer";
import {connect} from "react-redux";
import {addContact, deleteContact} from "./Components/redux/action";


const {Header, Content} = Layout;


function App({contacts, addContact, deleteContact}) {
    const [showDrawer, setShowDrawer] = useState(false);
    const [, setErrorInfo] = useState({});


    const handleAddFormFinish = (data) => {
        addContact({
            key: contacts.length + 1,
            ...data,
        });
        setShowDrawer(false);
    };

    const handleAddFormFinishFailed = (errorInfo) => {
        setErrorInfo(errorInfo);
    };


    const columns = [
        {
            title: 'Имя',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, contact) => (
                <Button onClick={() => deleteContact(contact.key)} icon={<DeleteOutlined/>} type="link"/>
            ),
        },
    ];
    return (
        <div>
            <Layout style={{minHeight: '100vh'}}>
                <Layout className="site-layout">
                    <Header/>
                    <Content style={{margin: '0 16px'}}>

                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Fragment>
                                <div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: 20}}>
                                        <Button type="primary"
                                                icon={<PlusCircleFilled/>}
                                                data-testid="add-contact-button"
                                                onClick={() => setShowDrawer(true)}
                                        >
                                            Добавить
                                        </Button>
                                    </div>
                                </div>
                                <Layout.Content>
                                    <Table dataSource={contacts} columns={columns}/>
                                </Layout.Content>
                                <AddDrawer
                                    show={showDrawer}
                                    handleOnClose={() => setShowDrawer(false)}
                                    handleOnFinish={handleAddFormFinish}
                                    handleOnFinishFailed={handleAddFormFinishFailed}
                                />
                            </Fragment>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts && state.contacts.allContacts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addContact: (contact) => {
            dispatch(addContact(contact))
        },
        deleteContact: (key) => {
            dispatch(deleteContact(key))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
