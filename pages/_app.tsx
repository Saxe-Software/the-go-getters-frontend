import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import '../styles/pages/index.scss';
import '../styles/pages/episode.scss';
import '../styles/pages/404.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
