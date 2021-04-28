import { goPay, payRequest } from '@/http/modules/pay'

export const  dealPay = async (ids) => {
    let params = {
        arrangementIds: ids
    }
    const { data } = await goPay(params)
    return data
}

// 获取支付结果
export const getRequestById = async (id) => {
    let params = {
        payCenterOrderNo: id
    }

    const { data } = await payRequest(params)
    return data
}

