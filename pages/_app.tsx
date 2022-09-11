import '../styles/globals.scss';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export default MyApp;
