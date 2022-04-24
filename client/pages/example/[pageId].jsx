/* eslint-disable consistent-return */
import React from 'react';
import { useRouter } from 'next/router';
import TableOfContents from '../../components/TableOfContents';
import ManualPage from './ManualPage';

function GetPage() {
  const router = useRouter();

  const { pageId } = router.query;

  return (
    <>
      <TableOfContents />
      <ManualPage pageId={pageId} />
    </>
  );
}

export default GetPage;
