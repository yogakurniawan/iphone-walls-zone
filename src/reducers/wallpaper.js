import { fromJS } from 'immutable';

import {
  LOAD_WALLPAPERS,
  LOAD_WALLPAPERS_SUCCESS,
  LOAD_WALLPAPERS_ERROR,
  UPDATE_WALLPAPER,
  UPDATE_WALLPAPER_SUCCESS,
  UPDATE_WALLPAPER_ERROR,
  GET_TOTAL_WALLPAPER,
  GET_TOTAL_WALLPAPER_SUCCESS,
  GET_TOTAL_WALLPAPER_ERROR,
  SET_TOTAL_WALLPAPER,
  SET_PAGE,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: {
    loadWallpapers: false,
    loadWallpaper: false,
    getTotalWallpaper: false,
    sendLike: false,
  },
  error: {
    loadWallpapers: null,
    loadWallpaper: null,
    getTotalWallpaper: null,
    sendLike: null,
  },
  payload: {
    wallpapers: [],
    wallpaper: null,
    page: 0,
    total: 0,
  },
});

function wallpaper(state = initialState, action) {
  const { payload, error } = action;
  switch (action.type) {
    case SET_PAGE:
      return state
        .setIn(['payload', 'page'], payload);
    case SET_TOTAL_WALLPAPER:
      return state
        .setIn(['payload', 'total'], payload);
    case LOAD_WALLPAPERS:
      return state
        .setIn(['loading', 'loadWallpapers'], true)
        .setIn(['error', 'loadWallpapers'], null)
        .setIn(['payload', 'wallpapers'], []);
    case LOAD_WALLPAPERS_SUCCESS:
      return state
        .setIn(['loading', 'loadWallpapers'], false)
        .setIn(['error', 'loadWallpapers'], null)
        .setIn(['payload', 'wallpapers'], payload);
    case LOAD_WALLPAPERS_ERROR:
      return state
        .setIn(['error', 'loadWallpapers'], error)
        .setIn(['loading', 'loadWallpapers'], false)
        .setIn(['payload', 'wallpapers'], []);
    case GET_TOTAL_WALLPAPER:
      return state
        .setIn(['loading', 'getTotalWallpaper'], true)
        .setIn(['error', 'getTotalWallpaper'], null)
        .setIn(['payload', 'total'], 0);
    case GET_TOTAL_WALLPAPER_SUCCESS:
      return state
        .setIn(['loading', 'getTotalWallpaper'], false)
        .setIn(['error', 'getTotalWallpaper'], null)
        .setIn(['payload', 'total'], payload.count);
    case GET_TOTAL_WALLPAPER_ERROR:
      return state
        .setIn(['error', 'getTotalWallpaper'], error)
        .setIn(['loading', 'getTotalWallpaper'], false)
        .setIn(['payload', 'total'], 0);
    case UPDATE_WALLPAPER:
      return state
        .setIn(['loading', 'sendLike'], true)
        .setIn(['error', 'sendLike'], null);
    case UPDATE_WALLPAPER_SUCCESS: {
      const wallpaperList = state.getIn(['payload', 'wallpapers']).slice(0);
      const newWallpaperList = wallpaperList.map((item) => {
        let result = item;
        if (result.id === payload.id) {
          result = payload;
        }
        return result;
      });
      return state
        .setIn(['loading', 'sendLike'], false)
        .setIn(['error', 'sendLike'], null)
        .setIn(['payload', 'wallpapers'], newWallpaperList);
    }
    case UPDATE_WALLPAPER_ERROR:
      return state
        .setIn(['error', 'sendLike'], error)
        .setIn(['loading', 'sendLike'], false);
    default:
      return state;
  }
}

export default wallpaper;
