<template>
    <div :class="queItem.answerMode === 'Composite'? 'question-Composite' : ''">
        <div class="queStem">
            <span class="mr5 fl">{{queItem.sequence + '.'}}</span>
            <span v-html="queItem.stem"></span>
        </div>
        <div class="quetionContent mt30">
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
                <Question  v-for="subItem in queItem.subqustionList" :key="subItem" :queItem="subItem" />
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
        console.log(this.queItem)
        this.text = JSON.stringify(this.queItem)
    },
    watch: {
        queItem: {
            handler () {
                console.log(this.queItem)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.fl {
    float: left;
}
.queStem {
    font-size: 24px;
    color: #404E6F;
    font-weight: 500;
    line-height: 30px;
    
}
.question-Composite {
    display: flex;
}
</style>