import axios from 'axios';
import {
  LOAD_WALLPAPERS,
  UPDATE_WALLPAPER,
  LOAD_WALLPAPERS_SUCCESS,
  SET_TOTAL_WALLPAPER,
  GET_TOTAL_WALLPAPER,
  SET_PAGE,
} from 'constants/ActionTypes';
import {
  BASE_API_URL,
  PER_PAGE,
} from 'constants/index';
import request from 'utils/request';

const WALLPAPERS_API = `${BASE_API_URL}/Wallpapers`;

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page,
  };
}

export function setTotalWallpaper(total) {
  return {
    type: SET_TOTAL_WALLPAPER,
    payload: total,
  };
}

export function setWallpapers(wallpapers) {
  return {
    type: LOAD_WALLPAPERS_SUCCESS,
    payload: wallpapers,
  };
}

export function getWallpapersByCategory({ page, category }) {
  const queryParams = {
    'filter[where][categoryId]': category.id,
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0,
  };
  if (category.name === '') {
    delete queryParams['filter[where][categoryId]'];
  }
  return {
    type: LOAD_WALLPAPERS,
    promise: request(WALLPAPERS_API, { queryParams }),
  };
}

export function getWallpapersByIphoneModel({ page, modelId }) {
  const queryParams = {
    'filter[where][iphoneModelId]': modelId,
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0,
  };

  return {
    type: LOAD_WALLPAPERS,
    promise: request(WALLPAPERS_API, { queryParams }),
  };
}

export function getTotalWallpaper() {
  return {
    type: GET_TOTAL_WALLPAPER,
    promise: request(`${WALLPAPERS_API}/count`),
  };
}

export function getWallpapers({ page }) {
  const queryParams = {
    'filter[limit]': PER_PAGE,
    'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0,
  };
  return {
    type: LOAD_WALLPAPERS,
    promise: request(WALLPAPERS_API, { queryParams }),
  };
}

export function updateWallpaper(data) {
  return {
    type: UPDATE_WALLPAPER,
    promise: axios.put(WALLPAPERS_API, data),
  };
}
