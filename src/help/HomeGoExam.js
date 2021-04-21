const stateList = {
    // 首页不动
    home: '',
    // 开始考试
    startTakePhoto: 'startExam',
    // 结束拍照考试
    submitExam: '',
    // 开始考试
    startExam: 'startExam'
}

export const getStateRouter = (state) => {
    return stateList[state] || ''
}