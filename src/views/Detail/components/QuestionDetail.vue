<template>
    <div class="question">
        <div class="queStem" :class="queItem.answerMode === 'Composite'? 'compositeStem' : ''" :id="queItem.id">
            <span class="mr5 fl">{{(queItem.usedsequence ? queItem.usedsequence : queItem.sequenceinstructure) + '.'}}</span>
            <span v-html="queItem.stem"></span>
        </div>
        <div class="quetionContent" :class="queItem.answerMode === 'Composite'? 'compositeCon' : 'mt30'">
            <SingleSelectionDetail v-if="queItem.answerMode === 'SingleSelection'" :question="queItem"/>
            <MultiSelectionDetail v-if="queItem.answerMode === 'MultiSelection'" :question="queItem"/>
            <JudgementDetail v-if="queItem.answerMode === 'Judgement'" :question="queItem"/>
            <JudgementCorrectsMistakesDetail
            v-if="queItem.answerMode === 'JudgementCorrectsMistakes'"
            :question="queItem"
            />
            <BlankFillingDetail v-if="queItem.answerMode === 'BlankFilling'" :question="queItem" />
            <EssayQuestionDetail v-if="queItem.answerMode === 'EssayQuestion'" :question="queItem"/>
            <template v-if="queItem.answerMode === 'Composite'">
                <QuestionDetail v-for="subItem in queItem.subQuestions" :key="subItem.id" :queItem="subItem" />
                <!-- 复合题解析 -->
                <!-- 解析 -->
                <detail :question="queItem">
                    <div>大题解析</div>
                </detail>
            </template> 
            
        </div>
    </div>
</template>
<script>
import SingleSelectionDetail from "./quetions/SingleSelectionDetail.vue"
import MultiSelectionDetail from "./quetions/MultiSelectionDetail.vue"
import JudgementDetail from "./quetions/JudgementDetail.vue"
import JudgementCorrectsMistakesDetail from "./quetions/JudgementCorrectsMistakesDetail.vue"
import BlankFillingDetail from "./quetions/BlankFillingDetail.vue"
import EssayQuestionDetail from "./quetions/EssayQuestionDetail.vue"
import Detail from './quetions/Detail.vue'
export default {
    name: 'QuestionDetail',
    components: {
        SingleSelectionDetail,
        MultiSelectionDetail,
        JudgementDetail,
        JudgementCorrectsMistakesDetail,
        BlankFillingDetail,
        EssayQuestionDetail,
        Detail,
    },
    props: {
        queItem: {
            type: Object
        }
    },
    data () {
        return {
            
        }
    },
    created () {
        
    }
}
</script>
<style lang="less" scoped>
.fl {
    float: left;
}
.question {
    // padding: 30px 0;
    max-height: 100%;
    overflow: auto;
    margin-bottom: 30px;
}
.queStem {
    font-size: 16px;
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
        max-height: 100%;
        overflow: auto;
    }
}

</style>