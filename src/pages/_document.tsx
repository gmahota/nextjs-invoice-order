import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="text-gray-900 leading-tight">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            {/* {`#__next {
                                height: ${this.props.shouldShow ? '100%' : '0'}
                            }
                        `} */}
          </style>
        </Head>
        <body className="text-gray-800 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
