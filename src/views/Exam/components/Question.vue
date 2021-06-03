<template>
    <div class="question" :class="queItem.answerMode === 'Composite' && isFlex ? 'question-Composite' : ''">
        <div class="queStem" :class="queItem.answerMode === 'Composite' && isFlex ? 'compositeStem' : ''">
            <span class="mr5 fl">{{queItem.sequence + '.'}}</span>
            <span v-html="queItem.stem"></span>
            <span class="f12 col_grayQ">{{`（分数：${queItem.score}分）`}}</span>
        </div>
        <!-- 大作业 -->
        <div class="quetionContent" v-if="$route.name=='examDa'">
            <template v-if="queItem.answerMode === 'Composite'">
                <Question class="comQue"  v-for="subItem in queItem.subqustionList" :key="subItem.questionId" :queItem="subItem" />
            </template>
            <template v-else>
                <p class="f14 col_grayQ mt20">请在纸页上作答，并拍照上传。( 分数：<span>{{queItem.score}}</span>分 )</p>
            </template>
        </div>
        <div class="quetionContent" :class="queItem.answerMode === 'Composite' && isFlex ? 'compositeCon' : 'mt30'" v-else>
            <SingleSelection v-if="queItem.answerMode === 'SingleSelection'" :question="queItem"/>
            <MultiSelection v-if="queItem.answerMode === 'MultiSelection'" :question="queItem"/>
            <Judgement v-if="queItem.answerMode === 'Judgement'" :question="queItem"/>
            <JudgementCorrectsMistakes
            v-if="queItem.answerMode === 'JudgementCorrectsMistakes'"
            :question="queItem"
            />
            <BlankFilling v-if="queItem.answerMode === 'BlankFilling'" :question="queItem" />
            <EssayQuestion v-if="queItem.answerMode === 'EssayQuestion'" :question="queItem"/>
            <template v-if="queItem.answerMode === 'Composite'">
                <Question class="comQue"  v-for="subItem in queItem.subqustionList" :key="subItem.questionId" :queItem="subItem" />
            </template>
        </div>
    </div>
</template>
<script>
import SingleSelection from "./quetions/SingleSelection.vue";
import MultiSelection from "./quetions/MultiSelection.vue";
import Judgement from "./quetions/Judgement.vue";
import JudgementCorrectsMistakes from "./quetions/JudgementCorrectsMistakes.vue";
import BlankFilling from "./quetions/BlankFilling.vue";
import EssayQuestion from "./quetions/EssayQuestion";
export default {
    name: 'Question',
    components: {
        SingleSelection,
        MultiSelection,
        Judgement,
        JudgementCorrectsMistakes,
        BlankFilling,
        EssayQuestion,
    },
    props: {
        queItem: {
            type: Object
        },
        isFlex: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            text: '',
        }
    },
    created () {
        // console.log(this.queItem)
        this.text = JSON.stringify(this.queItem)
    }
}
</script>
<style lang="less" scoped>
.fl {
    float: left;
}
.question {
    // padding: 30px 0;
    height: 100%;
    overflow: auto;
    margin-bottom: 30px;
}
.comQue .question{
    height: auto;
}
.queStem {
    font-size: 24px;
    color: #404E6F;
    font-weight: 500;
    line-height: 30px;
    
}
.quetionContent {
    width: 95%;
    margin: auto;
}
.quetionContent.mt30{
    margin-top: 30px;
}
.question-Composite {
    display: flex;
    .compositeStem {
        width: 50%;
        flex-shrink: 0;
        height: 100%;
        overflow: auto;
    }
    .compositeCon {
        width: 50%;
        flex-shrink: 0;
        height: 100%;
        overflow: auto;
        .question {
            height: auto;
        }
    }
}
</style>