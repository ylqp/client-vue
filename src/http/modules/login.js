import { Login, CheckCode } from '../api'
import request from '../request'

export const login = (data) => {
    return request(Login, data)
}

export const getCheckCode = () => {
    return request(CheckCode)
}
