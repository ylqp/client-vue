import request from '../request'
import { 
    OIMMessageList,
    APPHomeRun,
    APPLoginRun,
    OIMMessageCount,
    OIMMESSAGEISREAD
} from '../api'

// var msgParam = {
//     messageType: 'SystemMess',//messageType ：SystemMess-系统  Group-活动  UserMess-用户
//     cutPageData: {
//         pageNo: 1, // 分页 --- 页码
//         pageSize: 10 // 分页 --- 每页最大数
//     },
//     onlyUnread: false //只看未读  false全部  
// };
// 获取消息列表
export const getMsgList = (data) => {
    return request(OIMMessageList, data)
}
// 登录页执行
export const loginMsg = () => {
    return request(APPLoginRun)
}
// 菜单执行
export const navMsg = () => {
    return request(APPHomeRun)
}
// 
export const countMsg = () => {
    return request(OIMMessageCount)
}
export const readMsg = (data) => {
    return request(OIMMESSAGEISREAD, data)
}
