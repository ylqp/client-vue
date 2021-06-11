<template>
    <div>
        <div @click="isShowHelp = true" class="helpLink col_grayQ">考试遇到问题？</div>
        <div v-if="isShowHelp">
            <pop-bg>
                <div class="helpContainer">
                    <nav>
                        <ul>
                            <li 
                                v-for="item in helpData" :key="item.id" 
                                class="f16 fb mr30 cp" :class="currentId == item.id ? 'cur' : ''"
                                @click="currentId = item.id"
                            >{{item.name}}</li>
                        </ul>
                        <i class="iconfont icon-exit cp" @click="isShowHelp = false"></i>
                    </nav>
                    <article class="pt15 helpMian">
                        <ol>
                            <li v-for="msg in currentItem.messages" :key="msg.title">
                                <div v-html="msg.title"></div>
                                <div v-html="msg.content" class="msgContent"></div>
                            </li>
                        </ol>
                    </article>
                </div>
            </pop-bg>
        </div>
    </div>
</template>
<script>
import PopBg from './Pop/PopBg.vue'
import { otsExamHelpData } from '@/config/otsExamHelpData'
export default {
  components: { PopBg },
    name: 'HelpPop',
    data () {
        return {
            isShowHelp: false,
            currentId: 1,
            helpData: otsExamHelpData
        }
    },
    computed: {
        currentItem () {
            return this.helpData.filter(item => item.id == this.currentId)[0]
        }
    }
}
</script>
<style lang="less" scoped>
.helpLink {
    text-decoration: underline;
    cursor: pointer;
}
.helpContainer {
    width: 60%;
    background: #fff;
    border-radius: 2px;
    padding: 20px;
    nav {
        height: 40px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEF0F6;
        ul {
            display: flex;
            li.cur{
                font-size: 18px;
            }
            li.cur::after{
                content: "";
                width: 45px;
                height: 3px;
                background: #3388ff;
                display: flex;
                top: 16px;
                margin: 0 auto;
                position: relative;
            }
        }
    }
    .helpMian{
        min-height: 300px;
        ol li {
            font-size: 15px;
            font-weight: 600;
            color: #2B2C30;
            margin: 20px 0;
            .msgContent {
                font-size: 14px;
                font-weight: 400;
            }
        }
    }
    
}
</style>