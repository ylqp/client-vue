import { Login } from '../api'
import request from '../request'

export const login = (data) => {
    return request(Login, data)
}
