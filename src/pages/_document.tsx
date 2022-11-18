import Document, { Html, Head, Main, NextScript } from 'next/document';
import dynamic from 'next/dynamic';
const Toast = dynamic(() => import('~/components/Toast'), { ssr: false });

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8'></meta>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body id='root'>
          <Main />
          <Toast />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
