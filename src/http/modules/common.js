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

// 检查开始考试
export const ifStartExam = (data) => {
    return request(CheckStartAnswerPaper, data)
}

// 开始考试接口
export const getExam = (isFace, data) => {
    let interfaceUrl = isFace === 1 ? StartAnswerPaperWithPhoto : StartAnswerPaper
    return request(interfaceUrl, data)
}