import request from '../request'
import {
    OtsClientCreateUploadID,
    OtsClientGetFileUrl
} from '../api'

// 生成上传图片二维码
export const getUploadImgQR = () => {
    return request(OtsClientCreateUploadID)
}
// 获取上传的图片
export const getUploadImg = () => {
    return request(OtsClientGetFileUrl)
}