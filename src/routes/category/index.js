import React from 'react';
import Layout from '../../containers/Layout';
import Category from '../../containers/Category';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const categoryReducer = state.get('category');
  const iphoneModelReducer = state.get('iphoneModel');
  const categories = categoryReducer.getIn(['payload', 'categories']);
  const iphoneModels = iphoneModelReducer.getIn(['payload', 'iphoneModels']);
  let categoriesData = categories;
  let iphoneModelsData = iphoneModels;

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
    if (!iphoneModelsData) throw new Error('Failed to load the categories.');
  }

  const { pageNumber, category } = params;
  const selectedCategory = categoriesData.find(item => item.name === category);
  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    category: {
      total: selectedCategory.total_wallpaper,
      name: category,
      id: selectedCategory.id,
    },
    iphoneModels: iphoneModelsData,
  };
  const component = (
    <Layout
      iphoneModels={iphoneModelsData}
      categories={categoriesData}
    >
      <Category params={parameters} />
    </Layout>);
  return {
    description: `Download free ${category} iPhone Wallpapers and iPod Touch Wallpapers HD`,
    chunks: ['category'],
    title: `Free ${category} iPhone Wallpapers and iPod Touch Wallpapers HD`,
    component,
  };
}

export default action;
