import type { AppProps } from 'next/app';
import '~/globalStyles/globalStyles.scss';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import ModalProvider from '~/contexts/ModalContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useApollo } from '~/lib/ApolloCient';
import { ApolloProvider } from '@apollo/client';
import { wrapper } from '~/redux/store';
import { Provider } from 'react-redux';
const process = new ProgressBar({
  size: 3,
  className: 'bar-of-progress'
});
Router.events.on('routeChangeStart', process.start);
Router.events.on('routeChangeComplete', process.finish);
Router.events.on('routeChangeError', process.finish);
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <ModalProvider>
          <ToastContainer autoClose={2000} />
          <Component {...pageProps} />;
        </ModalProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
