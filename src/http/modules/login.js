import { Login, CheckCode, ClientCheckLogin, ClientStart } from '../api'
import request from '../request'

export const login = (data) => {
    return request(Login, data)
}

export const getCheckCode = () => {
    return request(CheckCode)
}

export const otherLogin = () => {
    return request(ClientCheckLogin)
}

export const checkStart = () => {
    return request(ClientStart)
}
