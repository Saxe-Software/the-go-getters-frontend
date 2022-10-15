import Layout from '../components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import '../styles/pages/index.scss';
import '../styles/pages/episode.scss';
import '../styles/pages/404.scss';
import { useState } from 'react';

const themes = {
  light: createTheme({}),
  dark: createTheme({
    palette: {
      mode: 'dark'
    }
  }),
};

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <ThemeProvider theme={darkMode ? themes.dark : themes.light}>
      <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
