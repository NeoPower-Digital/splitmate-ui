import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import createEmotionCache from '@/styles/createEmotionCache';
import GlobalStyles from '@/styles/globals.style';
import { THEME } from '@/styles/theme.style';
import { CacheProvider } from '@emotion/react';
import {
  createTheme,
  CssBaseline,
  Paper,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material';
import { Provider } from 'jotai';

const clientSideEmotionCache = createEmotionCache();

interface AppProps {
  Component: any;
  pageProps: any;
  emotionCache: any;
}

const globalStyles = <GlobalStyles />;

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider>
        <CacheProvider value={emotionCache}>
          {globalStyles}

          <ThemeProvider theme={responsiveFontSizes(createTheme(THEME))}>
            <Layout>
              <Component {...pageProps} />
            </Layout>

            <CssBaseline enableColorScheme />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </SessionProvider>
  );
}
