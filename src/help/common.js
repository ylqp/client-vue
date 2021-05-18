export const getOsInfo = () => {
    return window.navigator.userAgent
}

// 处理图片数据
export const dealImgData = (data) => {
    return `data:image/png;base64,${data}`
}