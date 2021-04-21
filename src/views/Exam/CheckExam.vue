<template>
  <div>
      <button @click="goExam">去考试页</button>
  </div>
</template>
<script>
export default {
  name: 'CheckExam',
  data () {
    return {
      isShowCheck: false
    }
  },
  created () {
      console.log(this.$route.params.isFace)
      
  },
  methods: {
    goExam () {
      if (this.$route.params.isFace === 1) {
        
      } else {
        this.$router.push({
          name: 'exam',
          query: this.$route.params
        })
      }
    }
  }
}
</script>
<style scoped>
</style>