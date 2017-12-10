import { LOAD_WALLPAPERS, LOAD_WALLPAPER, LIKE_WALLPAPER } from '../constants/actionTypes'

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
      if (state.wallpapers) {
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
      } else {
        return {
          ...state,
          wallpaper: {
            ...state.wallpaper,
            ...payload
          }
        }
      }
    }
    default:
      return state;
  }
}

export default wallpaper;
