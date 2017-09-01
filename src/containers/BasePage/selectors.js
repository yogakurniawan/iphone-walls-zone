import { createSelector } from 'reselect';

const wallpaper = state => state.get('wallpaper');
const category = state => state.get('category');
const global = state => state.get('global');
const iphoneModel = state => state.get('iphoneModel');

const selectWallpapers = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'wallpapers']),
);

const selectWallpaper = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'wallpaper']),
);

const selectPage = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'page']),
);

const selectTotal = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'total']),
);

const selectSelectedCategory = () => createSelector(
  category,
  state => state.getIn(['payload', 'selectedCategory']),
);

const selectCategories = () => createSelector(
  category,
  state => state.getIn(['payload', 'categories']),
);

const selectScreenWidth = () => createSelector(
  global,
  state => state.getIn(['payload', 'width']),
);

const selectSelectedIphoneModel = () => createSelector(
  global,
  state => state.getIn(['payload', 'selectedIphoneModel']),
);

const selectIphoneModel = () => createSelector(
  global,
  state => state.getIn(['payload', 'iphoneModel']),
);

const selectIphoneModels = () => createSelector(
  iphoneModel,
  state => state.getIn(['payload', 'iphoneModels']),
);

export {
  selectIphoneModels,
  selectIphoneModel,
  selectSelectedIphoneModel,
  selectScreenWidth,
  selectCategories,
  selectSelectedCategory,
  selectPage,
  selectWallpapers,
  selectWallpaper,
  selectTotal,
  wallpaper,
};
