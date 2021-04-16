<template>
  <div class="nav-container">
    <div class="ots-logo-container">
      <img src="@/assets/images/logo.png" alt="">
    </div>
    <div class="userinfo-container">
      <div class="avatar">
        <img src="@/assets/images/user.png">
      </div>
      <div class="username">牛晓芳</div>
      <div class="user-state">
        <span class="state"></span>
        <span>在线</span>
      </div>
    </div>
    <div class="tab-container">
      <ul>
        <li>
          <div>
            <i class="iconfont icon-kaoshi"></i>
            <p></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Nav'
}
</script>
<style scoped>
  .icon-kaoshi {
    color: #fff;
  }
  .nav-container {
    height: 100%;
    background: linear-gradient(to bottom,#0067FF,#2692FF);
  }
  .ots-logo-container {
    height: 60px;
    border-bottom: 1px solid #0D83FF;
  }
  .ots-logo-container img {
    width: 100%;
    height: 100%;
  }
  .userinfo-container {
    height: 182px;
    border-bottom: 1px solid #0D83FF;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
  }
  .userinfo-container .avatar {
    width: 62px;
    height: 62px;
    margin-top: 32px;
  }
  .userinfo-container .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .userinfo-container .username {
    margin: 12px 0 8px;
    font-size: 14px;
  }
  .userinfo-container .user-state {
    font-size: 12px;
  }
  .userinfo-container .state {
    background: green;
    display: inline-flex;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
</style>
