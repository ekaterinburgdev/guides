/* eslint-disable react/prop-types */
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Городские руководства</title>
      </Head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <Component />
    </>
  );
}

export default MyApp;
