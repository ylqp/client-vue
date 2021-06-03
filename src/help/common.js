import { setCameraConfig, closeCamera as closeCameraInterface, hideCamera } from '@/http/modules/camera'



// 开启摄像头data
const openCamera = (data) => {
    let config = {
        // 人像框
        IsLiveCheck: false,
        // 人脸追踪
        IsFaceDetect: true
    }
    if (data) {
        Object.assign(config, data)
    }

    try {
        console.log('开启摄像头')
        setCameraConfig(config).then((data) => {
            console.log(data)
            window.OTS.GetCameraRectangle()
        })
    } catch (e) {
        console.log('开启摄像头失败')
        console.log(e)
    }
}
const openPure = () => {
    try {
        console.log('开启摄像头')
        window.OTS.GetCameraRectangle()
    } catch (e) {
        console.log('开启摄像头失败')
        console.log(e)
    }
}
// 隐藏摄像头
const closeCamera = () => {
    console.log('隐藏摄像头')
    hideCamera()
}
// 
const closePure = () => {
    console.log('关闭摄像头')
    closeCameraInterface()
}
export const camera = {
    open: openCamera,
    close: closeCamera,
    openPure: openPure,
    closePure: closePure
}

// 获取浏览器
export const getOsInfo = () => {
    return window.navigator.userAgent
}

// 处理图片数据
export const dealImgData = (data) => {
    return `data:image/png;base64,${data}`
}