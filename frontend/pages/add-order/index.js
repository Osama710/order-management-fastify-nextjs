import React, { useState } from 'react'
import Navbar from '../../components/navbar';
import { Button, Layout, Form, Input, message, Select } from 'antd';
import { useRouter } from 'next/router';

export async function getStaticProps() {
    const res = await fetch('http://localhost:3002/customers')
    const res2 = await fetch('http://localhost:3002/product')
    const customers = await res.json()
    const products = await res2.json()
    return {
        props: {
            customers: customers?.customers,
            products: products?.products
        },
    }
}

const AddOrder = ({ customers, products }) => {
    const router = useRouter();

    const [prod, setProd] = useState(1);

    const onFinish = (values) => {
        values.order_date = new Date();
        values.total_price = 0;
        let products = []
        Object.entries(values)?.filter(([k, v]) => k.includes("products") && products.push(v) && delete values[k])
        values.products = products
        fetch('http://localhost:3002/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(res => message.success("Order Added")).then(res => router.push("/order"));
    };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <>
            {/* <Layout style={{ minHeight: '100vh' }}> */}
            <Navbar />
            <Layout className="site-layout">
                <h2>Add New Order</h2>
                <Form
                    name="product"
                    labelCol={{
                        span: 4,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item
                        label="Customer"
                        name="customer_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please select customer!',
                            },
                        ]}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 8,
                        }} 
                          
                    >
                        <Select className='select_dropdown'
                        >
                            {customers?.map((customer, index) => (
                                <Select.Option key={index} value={customer?.id}>{customer?.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {[...Array(prod)]?.map((p, index) => (
                        <Form.Item
                            name={"products" + (index + 1).toString()}
                            className="products"
                            key={index}
                            labelCol={{
                                span: 4,
                            }}
                        >
                            <Form.Item label="Product" name={["products" + (index + 1).toString(), "id"]}
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 8,
                                }} rules={[
                                    {
                                        required: true,
                                        message: 'Please select a product.',
                                    },
                                ]}>
                                <Select className='select_dropdown'
                                >
                                    {products?.map((product,index) => (
                                        <Select.Option key={index} value={product?.id}>{product?.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Quantity" name={["products" + (index + 1).toString(), "quantity"]}
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 8,
                                }} rules={[
                                    {
                                        required: true,
                                        message: 'Please enter quantity.',
                                    },
                                ]}>
                                <Input type='number' />
                            </Form.Item>
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{
                        offset: 4,
                        span: 8,
                    }}>
                        <Button type="primary" className='add_prod' onClick={() => setProd(prod + 1)}>
                            Add
                        </Button>
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

export default AddOrder