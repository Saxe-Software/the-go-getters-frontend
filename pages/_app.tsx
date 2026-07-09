import type { AppProps } from 'next/app';
import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:title' content='The Go Getters' key='title' />
        <link rel='icon' type='image/png' href='/favicon.png' />
        <link rel='apple-touch-icon' href='/favicon.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Nav />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default MyApp;
