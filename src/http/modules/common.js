import request from '../request'
import { GETSCHOOLCODE, UserFPSettings } from '../api'

// 获取租户
export const getTenate = () => {
    return request(GETSCHOOLCODE, null)
}

// 获取用户配置项信息
export const getUserFpSettings = () => {
    return request(UserFPSettings, null)
}
