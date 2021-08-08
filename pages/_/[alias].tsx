import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

export default function Redirect(props: { data: string }) {
  return (
    <>
      <Head>
        <meta httpEquiv='refresh' content={`0; URL='${props.data}'`} />
      </Head>
      {console.log(props.data)}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const endPoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const res = await fetch(endPoint!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query($url: String!) {
          getLink(url: $url)
        }
      `,
      variables: {
        url: context.params?.alias,
      },
    }),
  });

  const data = await res.json();

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  if (!data.data.getLink) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.data.getLink,
    },
  };
};
