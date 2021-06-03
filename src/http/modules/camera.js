import request from '../request'
import {
    GetVideoList,
    SelectVideo,
    SetCameraConfig,
    TAKEPHOTOFACECOMPARE,
    HideCamera,
    CLOSECAMERA,
} from '../api'

export const getVideoList = () => {
    return request(GetVideoList)
}

export const selectVideo = (data) => {
    return request(SelectVideo, data)
}

export const setCameraConfig = (data) => {
    return request(SetCameraConfig, data)
}

export const takePhoto = (data) => {
    return request(TAKEPHOTOFACECOMPARE, data)
}

export const hideCamera = () => {
    return request(HideCamera)
}

export const closeCamera = () => {
    return request(CLOSECAMERA)
}
