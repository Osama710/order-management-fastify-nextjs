import React from 'react'
import Navbar from '../../components/navbar';
import { Button, Layout, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';

const AddCustomer = () => {
    const router = useRouter()
    const onFinish = (values) => {
        fetch('http://localhost:3002/customers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then(res => message.success("Customer Added")).then(res => router.push("/customer"));
    };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    return (
        <>
        {/* <Layout style={{ minHeight: '100vh' }}> */}
            <Navbar />
            <Layout className="site-layout">
                <h2>Add New Customer</h2>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                      }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your number!',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
        {/* </Layout> */}
        </>
    )
}

export default AddCustomer