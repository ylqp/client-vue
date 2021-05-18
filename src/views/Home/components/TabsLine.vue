<template>
  <div class="tabsLine">
      <div>
        <ul>
          <li class="tabItem" 
              :class="currentId === item.id ? 'cur' : ''"
              v-for="item in tabList" :key="item.id"
              @click="changeStatus(item.id)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div v-if="isShowSearch">
          <!-- <el-input
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            clearable
            v-model="aa"
          ></el-input> -->
          <search @on-click="searchFn"/>
      </div>
  </div>
</template>
<script>
import Search from '../../../components/Search.vue'
export default {
  components: { Search },
  name: 'TabsLine',
  props: {
    tabList: {
      type: Array
    },
    initId: {
      type: Number
    },
    isShowSearch: {
      type: Boolean,
      default: true
    },
    searchFn: {
      type: Function
    }
  },
  data () {
      return {
        currentId: 0
      }
  },
  created () {
    this.currentId = this.initId ? this.initId : this.tabList[0].id
  },
  methods: {
    changeStatus (id) {
      if (this.currentId === id) {
        return
      }
      this.currentId = id
      this.$emit('changeStatus', id)
    }
  }
}
</script>
<style lang="less" scoped>
.tabsLine {
    height: 60px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    ul{
      display: flex;
      .tabItem {
        padding: 8px 16px;
        margin-right: 10px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 14px;
      }
      .tabItem.cur {
        color: #198CFF;
        border: 1px solid rgba(25,140,255,1);
      }
    }
    
}
</style>