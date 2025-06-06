import {cardService} from '../../services/card'
import { store } from '../store'
import { SET_CARDS,SET_CARD,ADD_CARD,UPDATE_CARD,REMOVE_CARD,SET_ALL_USER_TAGS} from '../reducers/card.reducer'
import { LOADING_START,LOADING_DONE } from '../reducers/system.reducer'

export async function loadCards(filterBy) { 
    try {
        store.dispatch( {type: LOADING_START})
        const cards = await cardService.query(filterBy) 
        store.dispatch( 
            {
            type: SET_CARDS,
            cards
            })
        store.dispatch({ type: LOADING_DONE })
            
    } catch (err) {
        console.log('Cannot load cards', err)
        throw err
    }
}

export async function loadAllUserTags(userId) {
  try {
    const allCards = await cardService.query({ userId }); // ✅ only userId filter
    const allTags = [...new Set(allCards.flatMap(card => card.linkTags || []))];
    store.dispatch({ type: SET_ALL_USER_TAGS, allUserTags: allTags });
  } catch (err) {
    console.error('Failed to load user tags', err);
  }
}



export async function removeCard(cardId) {
    try {
        await cardService.remove(cardId)
        store.dispatch(
        {
        type: REMOVE_CARD,
        cardId
        })
    } catch (err) {
        console.log('Cannot remove card', err)
        throw err
    }
}

export async function addCard(card) {
    try {
        const savedCard = await cardService.save(card)
        store.dispatch(
            {
            type: ADD_CARD,
            card
            })
        return savedCard
    } catch (err) {
        console.log('Cannot add card', err)
        throw err
    }
}

export async function updateCard(card) {
    try {
        store.dispatch(
            {
                type: UPDATE_CARD,
                card
            })
        const savedCard = await cardService.save(card)
        return savedCard
    } catch (err) {
        console.log('Cannot save card', err)
        throw err
    }
}

// export async function loadCard(cardId) {
//     try {
//         const card = await cardService.getById(gigId)
//         store.dispatch(
//             {
//                 type: SET_GIG,
//                 gig
//             }
//         )
//     } catch (err) {
//         console.log('Cannot load gig', err)
//         throw err
//     }
// }

// export async function addCarMsg(carId, txt) {
//     try {
//         const msg = await carService.addCarMsg(carId, txt)
//         store.dispatch(getCmdAddCarMsg(msg))
//         return msg
//     } catch (err) {
//         console.log('Cannot add car msg', err)
//         throw err
//     }
// }


// function getCmdSetGig(gig) {
//     return {
//         type: SET_GIG,
//         gig
//     }
// }
// function getCmdRemoveGig(gigId) {
//     return {
//         type: REMOVE_GIG,
//         gigId
//     }
// }
// function getCmdAddGig(gig) {
//     return {
//         type: ADD_GIG,
//         gig
//     }
// }
// function getCmdUpdateGig(gig) {
//     return {
//         type: UPDATE_GIG,
//         gig
//     }
// }
// function getCmdAddCarMsg(msg) {
//     return {
//         type: ADD_CAR_MSG,
//         msg
//     }
// }

// unitTestActions()
// async function unitTestActions() {
//     await loadCars()
//     await addCar(carService.getEmptyCar())
//     await updateCar({
//         _id: 'm1oC7',
//         title: 'Car-Good',
//     })
//     await removeCar('m1oC7')
//     // TODO unit test addCarMsg
// }
