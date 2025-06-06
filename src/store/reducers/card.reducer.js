export const SET_CARDS = 'SET_CARDS'
export const SET_CARD = 'SET_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const ADD_CARD = 'ADD_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const UPDATE_FILTER_BY='UPDATE_FILTER_BY'
export const SET_ALL_USER_TAGS='SET_ALL_USER_TAGS'

import { cardService } from "../../services/card"

const initialState = {
    cards: [],
    card: null,
    filterBy: cardService.getDefaultFilter(),
    allUserTags:[]
}

export function cardReducer(state = initialState, action) {
    var newState = state
    var cards
    var filterBy
    switch (action.type) {
        case SET_CARDS:
            newState = { ...state, cards: action.cards }
            break
        case SET_ALL_USER_TAGS:
            newState = { ...state, allUserTags: action.allUserTags }
            break
        case SET_CARD:
            newState = { ...state, card: action.card }
            break
        case REMOVE_CARD:
            // const lastRemovedCard = state.cards.find(card => card._id === action.cardId)
            cards = state.cards.filter(card => card._id !== action.cardId)
            newState = { ...state, cards }
            break
        case ADD_CARD:
            newState = { ...state, cards: [...state.cards, action.card] }
            break
        case UPDATE_CARD:
            cards = state.cards.map(card => (card._id === action.card._id) ? action.card : card)
            newState = { ...state, cards }
            break
        case UPDATE_FILTER_BY:
            let newFilterInput = action.filterBy
            let newFilter=  {...state.filterBy,...newFilterInput}

            newState = { ...state, filterBy: newFilter}
            
            break
        // case ADD_GIG_MSG:
        //     newState = { ...state, car: { ...state.car, msgs: [...state.car.msgs || [], action.msg] } }
        //     break
        default:
    }
    return newState
}

