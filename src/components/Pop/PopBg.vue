<template>
    <div class="popBg">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'PopBg'
}
</script>
<style scoped>
.popBg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
</style>