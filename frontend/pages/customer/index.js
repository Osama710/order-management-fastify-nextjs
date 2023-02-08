import React from 'react'
import { Button, Layout, Table } from 'antd';
import Navbar from '../../components/navbar';
import Link from 'next/link';

export async function getStaticProps() {
    const res = await fetch('http://localhost:3002/customers')
    const customers = await res.json()
    return {
        props: {
            customers,
        },
    }
}

const Customer = ({ customers }) => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    return (
        <>
        {/* <Layout style={{ minHeight: '100vh' }}> */}
            <Navbar />
            <Layout className="site-layout">
                <div className='flex flex_between'>
                <h2>Customers</h2>
                <Link href="/add-customer">
                <Button type="primary">
                    Add New
                </Button>
                </Link>
                </div>
                <Table dataSource={customers?.customers} columns={columns} pagination={false} rowKey={'id'} />
            </Layout>
        {/* </Layout> */}
        </>
    )
}

export default Customer;