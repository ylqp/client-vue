import request from '../request'
import { 
    QueryStudentPaymentBillByConditions, 
    QueryStudentPaymentTestActivityByConditions, 
    GetPaymentQr,
    GetPaymentResult,
} from '../api'

// 获取待支付列表
export const getPayList = (data = {answerWay: '1'}) => {
    return request(QueryStudentPaymentTestActivityByConditions, data)
}

// 获取已支付列表
export const getPayedList = (data) => {
    return request(QueryStudentPaymentBillByConditions, data)
}

// 
export const goPay = (data) => {
    return request(GetPaymentQr, data)
}

export const payRequest = (data) => {
    return request(GetPaymentResult, data)
}


