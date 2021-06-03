<template>
    <div :class="otsMessageList.length > 0 ? 'ots-messageBox' : ''">
      <div class="ots-message">
        <ul class="message-list">
            
            <li
              class="message-item"
              v-for="(msgItem,mIndex) in otsMessageList"
              :key="msgItem.mIndex"
            >
              
                <div
                  class="left-border"
                  :class="[
                    `left-border-${msgItem.type}`
                  ]"
                ></div>
                <div class="message-content">
                  <div class="message-title-content">
                    <div class="message-title">
                      <div class="message-type-img">
                        <i
                          class="icon-type"
                          :class="[
                            `el-icon-${msgItem.type}`,
                            `${msgItem.type === 'default'?'el-icon-warning':''}`,
                            `icon-type-${msgItem.type}`
                          ]"
                        ></i>
                      </div>
                      <div class="message-title-text">{{msgItem.type === 'default'?'告知':titleMap[msgItem.type]}}</div>
                    </div>
                    <div class="message-close-btn" v-if="!msgItem.autoClose">
                      <i class="el-icon-close" @click="removeMessage(mIndex)"></i>
                    </div>
                  </div>
                  <div class="message-info">{{msgItem.content}}</div>
                </div>
              
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
  const defaultConfig = {
    title : '提示',
    type : 'default',
    content : '默认提示',
    duration : 2000,
    autoClose : true
  }
  export default {
    name: "OtsMessage",
    data () {
      return {
        otsMessageList : [],
        titleMap : {
          'success' : '成功',
          'error' : '失败',
          'warning' : '警告'
        }
      }
    },
    methods : {
      showOtsMessage (options) {
        let isHasSame = this.dealSameMessage(options)
        if (isHasSame) {
            let sameItem = this.otsMessageList.filter(item => item.content == options.content)[0]
            clearTimeout(sameItem.timer)
            this.autoRemoveMessage(sameItem.mId, sameItem.duration)
        } else {
            let mId = this.getMId();
            let messageItem = Object.assign(defaultConfig, {
              ...options,
              mId
            })
            this.otsMessageList.push(messageItem)
            messageItem.autoClose && this.autoRemoveMessage(mId, messageItem.duration)
        }
        
      },
      getMId () {
        if (!this.mId) {
          this.mId = 0;
        }
        this.mId++;
        return `mId${this.mId}`;
      },
      autoRemoveMessage (mId,duration) {
        let item = this.otsMessageList.filter(item => item.mId === mId)
        item[0].timer = setTimeout(() => {
          let mIndex = this.otsMessageList.findIndex(item => item.mId === mId);
          this.removeMessage(mIndex)
        },duration)
      },
      removeMessage (mIndex) {
        this.otsMessageList.splice(mIndex, 1);
      },
      handleAfterLeave () {
        console.log(123)
      },
      dealSameMessage (options) {
        return this.otsMessageList.some((item) => {
          return item.content == options.content
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .ots-messageBox {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .ots-message {
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
  .message-item {
    width: 440px;
    background: #FFFFFF;
    box-shadow: 0px 5px 24px 0px rgba(39, 46, 64, 0.15);
    border-radius: 5px;
    display: flex;
    margin-bottom: 20px;
    .left-border {
      width: 8px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .left-border.left-border-success {
      background: #15AD31;
    }
    .left-border.left-border-default {
      background: #198CFF;
    }
    .left-border.left-border-error {
      background: #F44A4A;
    }
    .left-border.left-border-warning {
      background: #FFBA00;
    }
  }
  .message-content {
    flex: 1;
    box-sizing: border-box;
    padding: 23px 17px 28px 24px;
  }
  .message-close-btn {
    .el-icon-close {
      font-size: 18px;
      color: #BBC5CD;
    }
  }
  .message-title-content {
    display: flex;
    justify-content: space-between;
    .message-title {
      display: flex;
      align-items: center;
    }
  }
  .message-title-text {
    font-size: 20px;
    color: #2B2C30;
    font-weight: 400;
    margin-left: 4px;
  }
  .message-type-img {
    .icon-type {
      font-size: 22px;
    }
    .icon-type-default {
      color: #198CFF;
    }
    .icon-type-success {
      color: #15AD31;
    }
    .icon-type-error {
      color: #F44A4A;
    }
    .icon-type-warning {
      color: #FFBA00;
    }
  }
  .message-info {
    color: #666A77;
    font-size: 16px;
    margin-top: 12px;
    line-height: 1.6;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
