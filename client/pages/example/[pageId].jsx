/* eslint-disable consistent-return */
import React from 'react';
import { useRouter } from 'next/router';
import map from 'lodash/map';
import styles from '../../styles/Template.module.css';
import ManualPage from './ManualPage';

const superagent = require('superagent');

function GetPage() {
  const router = useRouter();

  const { pageId } = router.query;

  return <ManualPage pageId={pageId} />;
}

export default GetPage;
