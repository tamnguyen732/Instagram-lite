import type { AppProps } from 'next/app';
import '~/globalStyles/globalStyles.scss';
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
