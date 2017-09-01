import React from 'react';
import Immutable from 'immutable';
import Layout from '../../containers/Layout';
import IphoneModel from '../../containers/IphoneModel';
import * as globalActions from '../../actions/global';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const globalReducer = state.get('global');
  const model = globalReducer.getIn(['payload', 'iphoneModel']);
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

  let thisIphoneModel = model;
  if (Immutable.Map.isMap(thisIphoneModel)) {
    thisIphoneModel = model.toObject();
  }
  const { pageNumber, iphoneModel } = params;
  const url = `/api/IphoneModels?filter[where][meta_route]=${iphoneModel}`;
  const resp = await fetch(url, {
    method: 'GET',
  });
  thisIphoneModel = await resp.json();
  if (Array.isArray(thisIphoneModel)) {
    thisIphoneModel = thisIphoneModel[0];
  }
  store.dispatch(globalActions.setIphoneModel(thisIphoneModel));
  if (!thisIphoneModel) throw new Error('Failed to load the iphone models.');
  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    iphoneModel: {
      ...thisIphoneModel,
      route: iphoneModel,
    },
    iphoneModels: iphoneModelsData,
  };

  const component = (
    <Layout
      iphoneModels={iphoneModelsData}
      categories={categoriesData}
    >
      <IphoneModel params={parameters} />
    </Layout>);
  return {
    description: `Download free ${thisIphoneModel.name} Wallpapers and iPod Touch Wallpapers HD`,
    chunks: ['iphone-model'],
    title: `Free ${thisIphoneModel.name} Wallpapers and iPod Touch Wallpapers HD`,
    component,
  };
}

export default action;
