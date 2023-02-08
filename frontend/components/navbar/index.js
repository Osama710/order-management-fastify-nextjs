import React, { useState } from 'react';
import { HomeOutlined, UserOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
const { Sider } = Layout;
const Navbar = () => {
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/']}
            selectedKeys={[router.pathname]}>
            <Menu.Item key="/">
                <Link href="/">
                    {/* <Icon type="home" /> */}<HomeOutlined />
                    <span>Home</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/customer">
                <Link href="/customer">
                    {/* <Icon type="mobile" /> */}<UserOutlined />
                    <span>Customer</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/product">
                <Link href="/product">
                    {/* <Icon type="notification" /> */}<SettingOutlined />
                    <span>Product</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/order">
                <Link href="/order">
                    {/* <Icon type="notification" /> */}<ShoppingCartOutlined />
                    <span>Order</span>
                </Link>
            </Menu.Item>
        </Menu>
        </Sider>
    )
};
export default Navbar;