import { Layout } from 'antd';
import 'antd/dist/reset.css';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Component {...pageProps} />
    </Layout>
  )
}
