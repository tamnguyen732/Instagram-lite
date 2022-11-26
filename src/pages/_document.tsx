import Document, { Html, Head, Main, NextScript } from 'next/document';

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

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
