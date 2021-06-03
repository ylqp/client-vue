import request from '../request'
import { 
    GETSCHOOLCODE, 
    UserFPSettings, 
    GetLocalStudentSimpleInformation, 
    QueryActivityTypeListByStudentIdAndCourseCode,
    QueryStudentArrangementListByTypeIdAndCoursecode,
    CheckStartAnswerPaper,
    StartAnswerPaperWithPhoto,
    StartAnswerPaper,
    TempSaveAnswerPaper,
    SubmitAnswerPaper,
    QueryAnswerPaperDetails,
    GetSchoolLogo,
    GetPreExamNote,
    MenuFunction,
    GetIsClientLogin,
    ResetAnswerPaperStartTime,
    StartRec,
    StopRec,
    GETCORPUSCLECODEBYCLIENT,
    FACECORPUSCLEBYCLIENT,
    STARTRANDOMTAKEPHOTO,
    ENDRANDOMTAKEPHOTO,
} from '../api'
// 获取学校logo
export const getSchoolLogo = () => {
    return request(GetSchoolLogo)
}
// 获取租户
export const getTenate = () => {
    return request(GETSCHOOLCODE, null)
}

// 获取用户配置项信息
export const getUserFpSettings = () => {
    return request(UserFPSettings, null)
}

// 获取用户展示信息
export const getUserSimpleInfo = () => {
    return request(GetLocalStudentSimpleInformation, null)
}

// 获取考试类型 data = { userId：'' } 而且要转换json
export const getExamType = (data) => {
    return request(QueryActivityTypeListByStudentIdAndCourseCode, data)
}

// 获取考试列表
export const getExamListByTypeIdAndCoursecode = (data) => {
    return request(QueryStudentArrangementListByTypeIdAndCoursecode, data)
}

// 检查开始考试 (这个接口会更新考试数据功能 不然数据只是在缓存中)
export const ifStartExam = (data) => {
    return request(CheckStartAnswerPaper, data)
}

// 开始考试接口
export const getExam = (isFace, data) => {
    let interfaceUrl = isFace == 1 ? StartAnswerPaperWithPhoto : StartAnswerPaper
    return request(interfaceUrl, data)
}

// 临时保存
export const tempSave = (data) => {
    return request(TempSaveAnswerPaper, data)
}

// 提交试卷
export const submitExam = (data) => {
    return request(SubmitAnswerPaper, data)
}

// 试卷详情接口
export const examDetail = (data) => {
    return request(QueryAnswerPaperDetails, data)
}

// 获取考试须知
export const getPreExamNote = () => {
    return request(GetPreExamNote)
}

// 获取菜单支付和消息
export const getNav = () => {
    return request(MenuFunction)
}

// 获取是浏览器登录 还是  客户端登录
export const getIsClientLogin = () => {
    return request(GetIsClientLogin)
}

// 考前拍照结束 重置考试时间
export const resetAnswerPaperStartTime = (data) => {
    return request(ResetAnswerPaperStartTime, data)
}

// 开始录制
export const startRec = () => {
    return request(StartRec)
}
// 结束录制
export const stopRec  = (data) => {
    return request(StopRec, data)
}
// 获取录制顺序
export const getLiveInfo = (data) => {
    return request(GETCORPUSCLECODEBYCLIENT, data)
}
// 比对活体检测方法
export const faceLive = (data) => {
    return request(FACECORPUSCLEBYCLIENT, data)
}

// 开始随机拍照
export const openRandomCamera = () => {
    return request(STARTRANDOMTAKEPHOTO)
}
// 关闭随机拍照
export const closeRandomCamera = () => {
    return request(ENDRANDOMTAKEPHOTO)
}