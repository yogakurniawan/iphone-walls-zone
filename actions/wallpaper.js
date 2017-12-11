import { LOAD_WALLPAPERS, LIKE_WALLPAPER, LIKE_WALLPAPER_FROM_DETAIL, LOAD_WALLPAPER } from '../constants/actionTypes'

export function loadWallpapers(payload) {
  return {
    type: LOAD_WALLPAPERS,
    payload
  };
}

export function loadWallpaper(payload) {
  return {
    type: LOAD_WALLPAPER,
    payload
  };
}

export function likeWallpaper(payload) {
  return {
    type: LIKE_WALLPAPER,
    payload
  };
}

export function likeWallpaperFromDetail(payload) {
  return {
    type: LIKE_WALLPAPER_FROM_DETAIL,
    payload
  };
}