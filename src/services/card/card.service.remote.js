import { httpService } from '../http.service'

export const cardService = {
    query,
    // getById,
    save,
    remove
}

async function query(filterBy = {txt:'' }) {
    return httpService.get(`card`, filterBy)
}

// function getById(gigId) {
//     return httpService.get(`gig/${gigId}`)
// }

async function remove(cardId) {
    return httpService.delete(`card/${cardId}`)
}
async function save(card) {
    var savedCard
    if (card._id) {
        savedCard = await httpService.put(`card/${card._id}`, card)
    } else {
        savedCard = await httpService.post('card', card)
    }
    return savedCard
}

// async function addCarMsg(carId, txt) {
//     const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
//     return savedMsg
// }