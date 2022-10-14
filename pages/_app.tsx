import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import '../styles/pages/index.scss';
import '../styles/pages/episode.scss';
import '../styles/pages/404.scss';
import axios from 'axios';

type PageProps = {
  episodes: any
} & AppProps

function MyApp({ Component, pageProps, episodes }: PageProps) {
  console.log(episodes)
  return (
    <Layout>
      <Component episodes={episodes} {...pageProps} />
    </Layout>
  );
}

export default MyApp;
