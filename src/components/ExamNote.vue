<template>
    <div class="popBg" v-show="isShowPop">
        <div class="noteBox col_grayZ">
            <div class="popTopLine">
                <span class="f14">{{tipTitle}}</span>
            </div>
            <div class="popCon" v-html="examNote"></div>
            <div class="popFooter">
                <span class="cancelBtn mr20" @click="$emit('cancel')">取消</span>
                <span class="okBtn" @click="startExam">同意</span>
            </div>
        </div>
    </div>
</template>
<script>
import { getPreExamNote } from '@/http/modules/common'
export default {
    name: 'ExamNote',
    props: [ 'currentExamInfo' ],
    data () {
        return {
            tipTitle: '',
            examNote: '',
            isShowPop: false
        }
    },
    created () {
        this.initExamNote()
    },
    methods: {
        async initExamNote () {
            const { data } = await getPreExamNote()
            console.log(data)
            this.tipTitle = data.tipTitle
            this.examNote = data.examNote
            if (data.isShow) {
                this.isShowPop = true
            } else {
                this.startExam()
            }
        },
        startExam () {
            console.log(this.currentExamInfo)
            this.$router.push({
                name: 'checkExam',
                query: {
                    isFace: this.currentExamInfo.isFace,
                    eid: this.currentExamInfo.eid,
                    examPath: this.currentExamInfo.routePath
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.popBg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.noteBox {
    position: absolute;
    width: 880px;
    /* height: 500px; */
    background: #FFF;
    overflow: hidden;
    left: 50%;
    top: 50%;
    margin-left: -440px;
    margin-top: -250px;
    box-shadow: 0px 10px 40px 0px rgb(39 46 64 / 80%);
    border-radius: 4px;
    z-index: 10;
    font-size: 14px;
}
.popTopLine {
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
    border-bottom: 1px solid #E7ECF1;
}
.popCon {
    max-height: 400px;
    overflow: auto;
    padding: 20px 30px;
}
.popFooter {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    .cancelBtn {
        padding: 8px 20px;
        background: #FFFFFF;
        border-radius: 3px;
        border: 1px solid #BBC5CD;
        cursor: pointer;
    }
    .okBtn {
        padding: 8px 20px;
        background: linear-gradient(45deg,rgba(0,103,255,1) 0%,rgba(38,146,255,1) 100%);
        border-radius: 3px;
        border: 1px solid rgba(231, 236, 241, 1);
        color: #fff;
        cursor: pointer;
    }
}
</style>