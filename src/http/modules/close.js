import request from '../request'
import { 
    APPCLOSE
} from '../api'

export const exitClient = () => {
    return request(APPCLOSE)
}