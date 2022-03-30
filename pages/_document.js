// using this to add google materials since doesnt want to allow links in there Head/next tag

import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html>
      <Head/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
