import { LOAD_WALLPAPERS, LOAD_WALLPAPER, LIKE_WALLPAPER, LIKE_WALLPAPER_FROM_DETAIL } from '../constants/actionTypes'

function wallpaper(state = {}, action) {
  const { payload, type } = action;
  switch (type) {
    case LOAD_WALLPAPERS:
      return {
        ...state,
        wallpapers: payload
      }
    case LOAD_WALLPAPER:
      return {
        ...state,
        wallpaper: payload
      }
    case LIKE_WALLPAPER: {
      let wallpapers = state.wallpapers.slice(0)
      wallpapers = wallpapers.map((wallpaper) => {
        let result = wallpaper;
        if (result.id === payload.id) {
          result = payload
        }
        return result
      });
      return {
        ...state,
        wallpapers
      }
    }
    case LIKE_WALLPAPER_FROM_DETAIL: 
      return {
        ...state,
        wallpaper: {
          ...state.wallpaper,
          ...payload
        }
      }
    default:
      return state;
  }
}

export default wallpaper;
