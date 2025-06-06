import { cardService as service } from './card.service.remote'

function getEmptyCard() {
	return {
		// vendor: makeId(),
		// speed: getRandomIntInclusive(80, 240),
		// msgs: [],
	}
}


//filters params:
// const sellerLevels=['basic','standard','premium']


// const uncheckedFilterArray =categories.map(category=>{
//     return (
//         {
//         category: category,
//         active:false,
//         })
// })

const ALLOWED_TAGS = [
  "news", "article", "app", "video", "music", "podcast", "recipe", "sport", "travel", "education", "finance",
  "ai", "health", "book", "event", "entertainment", "food", "social media", "product", "tool", "service"
];


function getDefaultFilter() {
    return {
        userId: '',
        sortField: 'msgSentAt',
        starOnly:false,
        sortDir: -1,
    }
}

export const cardService = { getDefaultFilter,ALLOWED_TAGS,
    ...service }



