import { LOAD_WALLPAPERS, LIKE_WALLPAPER, LOAD_WALLPAPER } from '../constants/actionTypes'

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