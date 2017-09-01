import React from 'react';
import Layout from '../../containers/Layout';
import Home from '../../containers/Home';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const categoryReducer = state.get('category');
  const wallpaperReducer = state.get('wallpaper');
  const iphoneModelReducer = state.get('iphoneModel');
  const wallpapers = wallpaperReducer.getIn(['payload', 'wallpapers']);
  const categories = categoryReducer.getIn(['payload', 'categories']);
  const iphoneModels = iphoneModelReducer.getIn(['payload', 'iphoneModels']);
  let categoriesData = categories;
  let iphoneModelsData = iphoneModels;
  let wallpapersData = wallpapers;

  // Wallpaper
  if (!wallpapersData.length) {
    const resp = await fetch('/api/Wallpapers?filter[limit]=12&filter[skip]=0', {
      method: 'GET',
    });
    wallpapersData = await resp.json();
    if (!wallpapersData) throw new Error('Failed to load the wallpapers.');
  }

  // Category
  if (!categoriesData.length) {
    const resp = await fetch('/api/Categories', {
      method: 'GET',
    });
    categoriesData = await resp.json();
    if (!categoriesData) throw new Error('Failed to load the categories.');
  }

  // Iphone Model
  if (!iphoneModelsData.length) {
    const resp = await fetch('/api/IphoneModels', {
      method: 'GET',
    });
    iphoneModelsData = await resp.json();
    if (!iphoneModelsData) throw new Error('Failed to load the iPhone models.');
  }

  const { pageNumber } = params;
  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    iphoneModels: iphoneModelsData,
    wallpapers: wallpapersData,
  };
  const component = (
    <Layout
      iphoneModels={iphoneModelsData}
      categories={categoriesData}
    >
      <Home params={parameters} />
    </Layout>
  );
  return {
    description: 'Best iPhone wallpapers for iPhone 6, iPhone 5, iPhone 4, and iPhone 3G. Awesome collection of iPhone wallpapers HD and iPod Touch backgrounds.',
    chunks: ['home'],
    title: 'Best iPhone Wallpapers - Free wallpapers for iPhone 6, iPhone 5 and iPod Touch',
    component,
  };
}

export default action;
