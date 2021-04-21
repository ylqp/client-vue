
import { getExamType } from '@/http/modules/common'

const state = {examTypeList: JSON.parse(window.localStorage.getItem('examTypeList')) || [] }
const getters = {
}
const mutations = {
    setExamTypeList (state, settings) {
        state.examTypeList = settings

        // 数据持久化
        window.localStorage.setItem('examTypeList', JSON.stringify(settings))
    }
}
const actions = {
    async geExamTypeList ({  commit, rootState  }) {
        // console.log(rootState)
        // console.log(rootState.user.userFPSettings)
        if (rootState.user.userFPSettings && rootState.user.userFPSettings.userId){
            
            const { data } = await getExamType({userId: rootState.user.userFPSettings.userId})
            const cdata = JSON.parse(data)
            commit('setExamTypeList', cdata.ActivityTypes)
        } else {
            // 跳到登录页
            
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
