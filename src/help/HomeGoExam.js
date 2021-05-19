const stateList = {
    // 首页不动
    home: '',
    // 支付
    gopayment: 'goPay',
    // 开始考试(不需要人脸识别)
    startExam: 'startExam',
    // 开始考试
    startPhotoExam: 'startPhotoExam',
    // 开始拍照
    startTakePhoto: 'startTakePhoto',
    // 结束拍照
    endTakePhoto: 'endTakePhoto',
    // 开始活体检测
    startLiveTest: 'startLiveTest',
    // 结束活体检测
    endLiveTest: 'endLiveTest',

    // 结束考试
    submitExam: 'submitExam',
    
}

export const getStateRouter = (state) => {
    return stateList[state] || ''
}

// startLiveTest
// startExam
// startTakePhoto
// startPhotoExam
// endLiveTest
// endTakePhoto
// submitExam
// home