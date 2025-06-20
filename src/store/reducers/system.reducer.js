export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_SEARCH_BOX_POS = 'SET_SEARCH_BOX_POS'
export const SET_SYSTEM_MODE = 'SET_SYSTEM_MODE'
export const SET_SHOW_MENU_MOBILE='SET_SHOW_MENU_MOBILE'
export const SET_SHOW_ORDER_MOBILE='SET_SHOW_ORDER_MOBILE'
export const SET_MARK_NEW_ORDER='SET_MARK_NEW_ORDER'





const initialState = {
  isLoading: false,
  searchBoxPosition: 'bottom',
  mode: 'buyer',
  showMenuMobile: false,
  showOrdersModal: false,
  markOrder:undefined
}

export function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_SEARCH_BOX_POS:
      return { ...state, searchBoxPosition: action.searchBoxPosition }
    case SET_SYSTEM_MODE:
      return { ...state, mode: action.mode }
    case SET_SHOW_MENU_MOBILE:
      return { ...state, showMenuMobile: action.showMenuMobile }
    case SET_SHOW_ORDER_MOBILE:
      return { ...state, showOrdersModal: action.showOrdersModal }
    case SET_MARK_NEW_ORDER:
      return { ...state, markOrder: action.markOrder }
    default: return state
  }
}

