import React from 'react'
import { Button, Layout, Table } from 'antd';
import Navbar from '../../components/navbar';
import Link from 'next/link';

export async function getStaticProps() {
    const res = await fetch('http://localhost:3002/product')
    const products = await res.json()
    return {
        props: {
            products,
        },
    }
}

const Product = ({ products }) => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];


    return (
        <>
            {/* <Layout style={{ minHeight: '100vh' }}> */}
            <Navbar />
            <Layout className="site-layout">
                <div className='flex flex_between'>
                    <h2>Product</h2>
                    <Link href="/add-product">
                        <Button type="primary">
                            Add New
                        </Button>
                    </Link>
                </div>
                <Table dataSource={products?.products} columns={columns} pagination={false} rowKey="id" />
            </Layout>
            {/* </Layout> */}
        </>
    )
}

export default Product;