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
    SubmitAnswerPaper
} from '../api'

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
    let interfaceUrl = isFace === 1 ? StartAnswerPaperWithPhoto : StartAnswerPaper
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