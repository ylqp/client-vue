<template>
    <div>
        <el-input
            :placeholder="placeholder"
            @keyup.enter.native="searchByKey($event)"
            ref="input"
            @change.native="searchFn"
            v-model="content"
        >
        <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
        </el-input>
    </div>
</template>
<script>
export default {
    name: 'Search',
    props: {
        placeholder: {
            type: String,
            default: "请输入搜索内容"
        },
    },
    data () {
        return {
            content: ''
        }
    },
    methods: {
        searchByKey (e) {
            this.$refs.input.blur()
            this.searchFn()
        },
        searchFn () {
            console.log('change')
            this.$emit('on-click', this.content);//将点击搜索的事件暴露给父组件
        }
    }
}
</script>
<style scoped>
</style>