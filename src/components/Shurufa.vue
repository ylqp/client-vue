<template>
    <div @mouseover="isShowTips = true" @mouseout="isShowTips = false">
        <div class="tipli tipItem" v-for="tip in tips" :key="tip" v-show="isShowTips">{{tip}}</div>
        <div class="tipli tipCon" >
            <img src="@/assets/images/jianpan.png" alt="">
            <span class="ml20">如何切换输入法？</span> 
        </div>
    </div>
</template>
<script>
// import { getOsInfo } from '@/help/common'
export default {
    name: 'Shurufa',
    data () {
        return {
            tips: [],
            isShowTips: false
        }
    },
    created () {
        this.dealTips()
    },
    methods: {
        dealTips () {
            const version = this.judgeOS()
            console.log(version)
            if (version > 3) {

                this.tips = [
                    '点击输入区域后出现输入光标',
                    '输入法切换：[win键+空格]',
                    '中英文切换：[shift] 或 [ctrl+空格]',
                ]

            } else {
                
                this.tips = [
                    '点击输入区域后出现输入光标',
                    '系统语言切换：[alt+shift]',
                    '输入法切换：[ctrl+shift]',
                    '中英文切换：[shift] 或 [ctrl+空格]',
                ]
            }
        },
        judgeOS () {
            const userAgent = window.navigator.userAgent.toLowerCase()
            let version = -1
            if (userAgent.indexOf('win') > -1) {

                if (userAgent.indexOf('windows nt 5.0') > -1) {
                    //version = 'Windows 2000';
                    version = 0
                } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
                    //version = 'Windows XP';
                    version = 1
                } else if (userAgent.indexOf('windows nt 6.0') > -1) {
                    //version = 'Windows Vista';
                    version = 2
                } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
                    //version = 'Windows 7';
                    version = 3
                } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
                    //version = 'Windows 8';
                    version = 4
                } else if (userAgent.indexOf('windows nt 6.3') > -1) {
                    //version = 'Windows 8.1';
                    version = 5
                } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
                    //version = 'Windows 10';
                    version = 6
                } else {
                    //version = 'Unknown';
                    version = -1
                }
            }
            return version
        }
    }
}
</script>
<style scoped>
.tipli {
    width: 220px;
    text-align: center;
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background: #000;
    white-space: nowrap;
    border-top: 1px solid #c7c7c7;
    opacity: .7;
    cursor: pointer;
}
.tipli.tipItem:hover {
    background: #535353;
}
.tipCon {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>