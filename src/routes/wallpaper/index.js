import React from 'react';
import Layout from '../../containers/Layout';
import Wallpaper from '../../containers/Wallpaper';
import { replaceDashWithSpace } from '../../utils/common';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const categoryReducer = state.get('category');
  const categories = categoryReducer.getIn(['payload', 'categories']);
  let data = categories;
  if (!data.length) {
    const resp = await fetch('/api/Categories', {
      method: 'GET',
    });
    data = await resp.json();
    if (!data) throw new Error('Failed to load the categories.');
  }
  return {
    description: `Download ${replaceDashWithSpace(params.name)} free`,
    chunks: ['wallpaper'],
    title: `${replaceDashWithSpace(params.name)} - Free Download`,
    component: <Layout showSideMenu={false} categories={data}>
      <Wallpaper params={params} />
    </Layout>,
  };
}

export default action;
