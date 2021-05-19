<template>
    <div class="question" :class="queItem.answerMode === 'Composite'? 'question-Composite' : ''">
        <div class="queStem" :class="queItem.answerMode === 'Composite'? 'compositeStem' : ''">
            <span class="mr5 fl">{{queItem.sequence + '.'}}</span>
            <span v-html="queItem.stem"></span>
        </div>
        <div class="quetionContent" :class="queItem.answerMode === 'Composite'? 'compositeCon' : 'mt30'">
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
        }
    },
    data () {
        return {
            text: ''
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