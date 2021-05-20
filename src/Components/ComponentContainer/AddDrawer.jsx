import React, {Fragment, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Button, Drawer, Form, Input} from 'antd';


const AddDrawer = ({show, handleOnClose, handleOnFinish, handleOnFinishFailed}) => {
    const initialValues = {firstName: "", lastName: "", phoneNumber: null};
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

    useEffect(() => {
        forceUpdate({});
    }, []);

    return (
        <Drawer
            width={500}
            data-testid="add-contact-drawer"
            title="Добавить контакт"
            visible={show}
            onClose={handleOnClose}
            maskClosable={false}

        >
            <Form
                form={form}
                name="basic"
                initialValues={initialValues}
                onFinish={handleOnFinish}
                onFinishFailed={handleOnFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    label="Имя"
                    name="firstName"
                    rules={[{required: true, message: 'Введите имя!'}]}
                >
                    <Input/>

                </Form.Item>
                <Form.Item
                    label="Фамилия"
                    name="lastName"
                    rules={[{required: true, message: 'Введите фамилию!'}]}
                >
                    <Input type="tel"/>
                </Form.Item>

                <Form.Item
                    label="Номер телефона"
                    name="phoneNumber"
                    rules={[{required: true, message: 'Введите номер телефона!'}]}
                >
                    <Input/>

                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Fragment>
                            <Button
                                style={{marginRight: 20}}
                                type="primary" htmlType="submit" disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({errors}) => errors.length).length
                            }>
                                Добавить
                            </Button>

                            <Button
                                htmlType="button"
                                onClick={() => form.resetFields()
                                }>
                                Стереть
                            </Button>
                        </Fragment>
                    )}
                </Form.Item>
            </Form>
        </Drawer>
    )
};

AddDrawer.propTypes = {
    show: PropTypes.bool.isRequired,
    handleOnClose: PropTypes.func.isRequired,
    handleOnFinish: PropTypes.func.isRequired,
    handleOnFinishFailed: PropTypes.func.isRequired
};

export default AddDrawer;