import { AppProps } from 'next/app';
import reset from 'styled-reset';
import React from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
  },
});

const GlobalStyle = createGlobalStyle`
  ${reset}
  // Write your global styles.
  html {
    height: 100%;
    width: 100%;
    font-size: 62.5%;
  }
  body {
    margin: 0;
    height: 100%;
    width: 100%
    font-size: 1rem;
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.5;
    background: #ffffff;
  }
  div#__next, div#__next > div {
    height: 100%;
  }
  #next, #next > div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  @font-face {
    font-family: 'electricboots';
    src: local('electricboots'), url(./fonts/ELECTRICBOOTS.ttf) format('truetype');
    font-display: swap;
  }
`;

const newServiceUrl: string = 'https://bibsgen.vercel.app';

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    window.location.href = newServiceUrl;

    const jss = document.querySelector('#jss-server-side');
    if (jss && jss.parentNode) {
      jss.parentNode.removeChild(jss);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width,initial-scale=1.0,viewport-fit=cover"
        />
        <meta property="og:image" content="https://bibs-generator.vercel.app/logo.png" />
        <meta property="og:title" content="Off-Road Number Generator" />
        <meta property="og:url" content="https://bibs-generator.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Off-Road Number Generator" />
        <meta
          property="og:description"
          content="オフロードバイクのゼッケン用のナンバーを作成するツールです。"
        />
        <meta
          name="Description"
          content="オフロードバイクのゼッケン用のナンバーを作成するツールです。"
        />
        <meta name="twitter:card" content="summary" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;600;700&display=swap"
          rel="preload"
          as="style"
        />
        <title key="title">Off-Road Number Generator γ</title>
      </Head>

      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
};

export default App;
