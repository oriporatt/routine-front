
import { userService as service } from './user.service.remote'

function getEmptyUser() {
    return {
        name: '', 
        phone: '', 
        // password: '',
    }
}


export const userService = { ...service, getEmptyUser }
