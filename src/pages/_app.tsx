import type { AppProps } from 'next/app';
import '~/globalStyles/globalStyles.scss';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import ModalProvider from '~/contexts/ModalContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useApollo } from '~/lib/ApolloCient';
import { ApolloProvider } from '@apollo/client';
const process = new ProgressBar({
  size: 3,
  className: 'bar-of-progress'
});
Router.events.on('routeChangeStart', process.start);
Router.events.on('routeChangeComplete', process.finish);
Router.events.on('routeChangeError', process.finish);
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>
        <ToastContainer autoClose={2000} />
        <Component {...pageProps} />;
      </ModalProvider>
    </ApolloProvider>
  );
}

export default MyApp;
