import React from 'react';
import Layout from '../../containers/Layout';
import Wallpaper from '../../containers/Wallpaper';
import { replaceDashWithSpace } from '../../utils/common';
import * as wallpaperActions from '../../actions/wallpaper';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const categoryReducer = state.get('category');
  const wallpaperReducer = state.get('wallpaper');
  const categories = categoryReducer.getIn(['payload', 'categories']);
  const wallpaper = wallpaperReducer.getIn(['payload', 'wallpaper']);
  let categoriesData = categories;
  let wallpaperData = wallpaper;

  // Categories
  if (!categoriesData.length) {
    const resp = await fetch('/api/Categories', {
      method: 'GET',
    });
    categoriesData = await resp.json();
    if (!categoriesData) throw new Error('Failed to load the categories.');
  }

  // Wallpaper
  if (!wallpaperData.length) {
    const url = `/api/Wallpapers?filter[where][name]=${decodeURI(replaceDashWithSpace(params.name))}`;
    const resp = await fetch(url, {
      method: 'GET',
    });
    wallpaperData = await resp.json();
    const category = categoriesData.find(item => item.id === wallpaperData[0].categoryId);
    const newWallpaper = {
      ...wallpaperData[0],
      category: category.name,
      total: category.total_wallpaper,
    };
    store.dispatch(wallpaperActions.setWallpaper(newWallpaper));
    if (!wallpaperData) throw new Error('Failed to load the wallpaper.');
  }

  return {
    description: `Download ${replaceDashWithSpace(params.name)} free`,
    chunks: ['wallpaper'],
    title: `${replaceDashWithSpace(params.name)} - Free Download`,
    component: <Layout showSideMenu={false} categories={categoriesData}>
      <Wallpaper wallpaper={wallpaperData[0]} params={params} />
    </Layout>,
  };
}

export default action;
