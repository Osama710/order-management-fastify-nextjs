import React from 'react'
import { Button, Layout, Table } from 'antd';
import Navbar from '../../components/navbar';
import Link from 'next/link';

export async function getStaticProps() {
    const res = await fetch('http://localhost:3002/orders')
    const orders = await res.json()
    return {
        props: {
            orders,
        },
    }
}

const Order = ({ orders }) => {

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => <span> {text.name}</span>
        },
        {
            title: 'Price',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'Date',
            dataIndex: 'order_date',
            key: 'order_date',
        },
    ];


    return (
        <>
            {/* <Layout style={{ minHeight: '100vh' }}> */}
            <Navbar />
            <Layout className="site-layout">
                <div className='flex flex_between'>
                    <h2>Orders</h2>
                    <Link href="/add-order">
                        <Button type="primary">
                            Add New
                        </Button>
                    </Link>
                </div>
                <Table dataSource={orders?.orders} columns={columns} pagination={false} rowKey="id" />
            </Layout>
            {/* </Layout> */}
        </>
    )
}

export default Order;