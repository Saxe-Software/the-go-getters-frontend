import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import '../styles/pages/index.scss';
import '../styles/pages/about.scss';
import '../styles/pages/episode.scss';
import '../styles/pages/episodes.scss';
import '../styles/pages/contact.scss';
import '../styles/pages/partners.scss';
import '../styles/pages/404.scss';
import { useState } from 'react';
import Head from 'next/head';

const themes = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#001587',
      },
      secondary: {
        main: '#f50057',
      },
      menu: {
        main: '#001041',
        contrastText: '#fff',
      },
      text: {
        primary: '#202020',
      },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      menu: {
        main: '#202020',
        contrastText: '#fff',
      },
      text: {
        primary: '#fff',
      },
    },
  }),
};

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <>
      <Head>
        <meta property='og:title' content='The Go Getters' key='title' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      </Head>

      <ThemeProvider theme={darkMode ? themes.dark : themes.light}>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <ErrorBoundary>
            <CssBaseline />
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
