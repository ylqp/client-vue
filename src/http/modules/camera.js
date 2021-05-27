import request from '../request'
import {
    GetVideoList,
    SelectVideo,
    GetCameraRectangle
} from '../api'

export const getVideoList = () => {
    return request(GetVideoList)
}

export const selectVideo = (data) => {
    return request(SelectVideo, data)
}

export const getCamera = () => {
    return request(GetCameraRectangle)
}