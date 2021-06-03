import Vue from 'vue'

const clientFn = {
    goLogin: function () {
        Vue.$router.push({
            name: 'Login'
        })
    }
}

export default clientFn