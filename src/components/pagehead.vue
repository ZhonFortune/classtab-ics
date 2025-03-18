<template>
  <el-container class="pagehead-container">
    <el-header style="
      height: 60px; width: 100%;
      display: flex; flex-direction: row;
      justify-content: space-between;
      border-bottom: 0.3px solid #f3f3f3;
    ">
      <el-container style="
        height: 100%;
        display: flex; flex-direction: row;
      ">
        <el-container style="
          align-items: center;
        ">
          <slot>
            <el-text type="primary" size="large" style="
              font-size: 1rem; font-weight: 800;
            ">
              ClassTab
            </el-text>
          </slot>

          <el-tag type="primary" effect="dark" size="small" style="
            margin-left: 15px;
          ">
            ICS
          </el-tag>
        </el-container>
  
        <!-- 多语言 -->
        <el-container style="
          height: 100%; flex: 0 0 auto;
          display: flex; flex-direction: row-reverse; align-items: center;
        ">
          <el-container style="
            height: 100%;
            display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center;
          ">
            <el-dropdown placement="bottom-start" type="normal" split-button trigger="click" v-on:click="ShowMessageOnUse">
              简体中文
              <template #dropdown>
                <el-dropdown-item v-on:click="ShowMessageNotSup">ENGLISH</el-dropdown-item>
                <el-dropdown-item v-on:click="ShowMessageNotSup">日本語</el-dropdown-item>
                <el-dropdown-item v-on:click="ShowMessageNotSup">繁體中文</el-dropdown-item>
              </template>
            </el-dropdown>
          </el-container> 
          
          <!-- 通知
          <el-container style="
            height: 100%; margin-right: 25px;
            display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center;
          ">
            <el-tooltip
              effect="light"
              placement="bottom"
              content="通知"
            >
              <el-button type="normal" size="small" circle id="message-button" @click="drawer1 = true">
                <el-icon :size="12">
                  <svg t="1740729735337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2451" width="200" height="200"><path d="M810.666667 640V213.333333a85.333333 85.333333 0 0 0-85.333334-85.333333H128a85.333333 85.333333 0 0 0-85.333333 85.333333v426.666667a85.333333 85.333333 0 0 0 85.333333 85.333333h597.333333a85.333333 85.333333 0 0 0 85.333334-85.333333z m-384-85.333333a120.746667 120.746667 0 0 1-70.4-22.186667L128 372.48V281.6l270.933333 189.866667a48.64 48.64 0 0 0 55.466667 0L725.333333 281.6v90.88l-228.266666 160A120.746667 120.746667 0 0 1 426.666667 554.666667z m469.333333-256v426.666666a85.333333 85.333333 0 0 1-85.333333 85.333334H213.333333a85.333333 85.333333 0 0 0 85.333334 85.333333h512a170.666667 170.666667 0 0 0 170.666666-170.666667V384a85.333333 85.333333 0 0 0-85.333333-85.333333z" p-id="2452"></path></svg>
                </el-icon>
              </el-button>
            </el-tooltip>
          </el-container> -->

          <!-- 登出 -->
          <el-container style="
            height: 100%; margin-right: 25px;
            display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center;
          ">
            <el-tooltip effect='light' placement="bottom" content="退出登录">
              <el-button type="primary" effect="dark" size="small" style="cursor: pointer;" @click="confirmLogout">
                <el-icon :size="12">
                  <svg t="1741240940111" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3778" width="200" height="200"><path d="M619.861333 910.779733h153.053867A148.855467 148.855467 0 0 0 921.6 762.094933V262.2464a148.957867 148.957867 0 0 0-148.6848-149.026133H619.861333a101.1712 101.1712 0 0 0-100.932266 100.932266A101.1712 101.1712 0 0 0 619.861333 315.050667h99.874134v394.171733H619.861333a100.9664 100.9664 0 0 0-100.932266 100.932267 100.898133 100.898133 0 0 0 100.932266 100.590933z" p-id="3779" fill="#ffffff"></path><path d="M319.488 324.539733A33.655467 33.655467 0 0 1 355.328 320.853333a33.518933 33.518933 0 0 1 18.978133 30.481067v60.962133h206.2336c18.6368 0 33.8944 14.916267 33.8944 33.860267v132.096a33.962667 33.962667 0 0 1-33.8944 33.860267h-206.2336v60.962133c0 12.868267-7.441067 24.712533-18.978133 30.481067-11.844267 5.7344-25.736533 4.061867-35.874133-3.754667L115.268267 538.965333a33.928533 33.928533 0 0 1 0-53.179733L319.488 324.539733z" p-id="3780" fill="#ffffff"></path></svg>
                </el-icon>
                <el-text style="margin-left: 5px; color: white" size="small">登出</el-text>
              </el-button>
            </el-tooltip>
          </el-container>

          <!-- 当前登录用户 -->
          <el-container style="
            height: 100%; margin-right: 25px;
            display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center;
          ">
            <el-tooltip effect='light' placement="bottom" content="暂时无法显示当前登录的用户">
              <el-tag type="normal" size="default" style="cursor: pointer;">
                <el-icon :size="12">
                  <svg t="1740830022058" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2302" width="200" height="200"><path d="M498.602667 191.744a204.714667 204.714667 0 0 1 116.906666 372.8c133.162667 47.317333 229.077333 173.290667 231.893334 322.026667l0.085333 6.784h-64c0-157.333333-127.573333-284.885333-284.885333-284.885334-155.136 0-281.301333 123.968-284.821334 278.250667l-0.085333 6.613333h-64c0-151.68 96.810667-280.746667 232-328.810666a204.714667 204.714667 0 0 1 116.906667-372.8z m0 64a140.714667 140.714667 0 1 0 0 281.450667 140.714667 140.714667 0 0 0 0-281.450667z" fill="#1677FF" p-id="2303"></path></svg>
                </el-icon>
                <el-text style="margin-left: 5px" size="small">{{ displayLoginedUser }}</el-text>
              </el-tag>
            </el-tooltip>
          </el-container>

        </el-container>
      </el-container>
    </el-header>

    <el-drawer
      v-model="drawer1"
      :direction="rtl"
      size="350"
      style="background-color:#f3f3f3"
      :with-header="false"
    >
      <template #title>
        <el-container
          style="
            height: 100%; display: grid;
            grid-template-rows: 0fr 1fr;
            flex-direction: column;
          "
        >
          <el-header
            style="height: 40px"
            
          ></el-header>
        </el-container>
      </template>
    </el-drawer>
    <!-- <el-footer class="panel">
      
    </el-footer> -->
  </el-container>
</template>

<script setup lang="js">
import { ref } from 'vue'
import { ElDrawer, ElButton, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter();
const drawer1 = ref(false)
const displayLoginedUser = ref('未登录')

// 登出确认函数
const confirmLogout = () => {
  // 判断是否登录
  const user = localStorage.getItem('loginedUserInfo')
  if (user) {
    ElMessageBox.confirm(
    '您确定要退出登录吗？',
    '确认登出',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
        // 用户点击确定，执行登出操作
        logout()
      })
    .catch(() => {
        // 用户点击取消，不做任何操作
    })
  }else if (!user){
    ElMessage({
      type: 'warning',
      message: '您还未登录',
      showClose: true
    })
  }else{
    ElMessage({
      type: 'error',
      message: '发生错误',
      showClose: true
    })
  }
}

// 登出
const logout = () => {
  // 清除localStorage中的loginedUserInfo
  localStorage.removeItem('loginedUserInfo')
  // 跳转到登录页面
  router.push({
    name: "Login"
  })
}
</script>

<script lang="js">
import { ElMessage } from 'element-plus';

export default {
  name: 'pagehead',
  data() {
  },
  methods: {
    ShowMessageOnUse() {
      ElMessage({
        message: "您正在使用简体中文",
        type: "success",
        showClose: true
      })
    },
    ShowMessageNotSup() {
      ElMessage({
        message: "该语言并未支持",
        type: "warning",
        showClose: true
      })
    }
  }
}
</script>

<style>
.pagehead-container {
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
}

.panel {
  width: 100%;
  display: flex;
  /* flex: 60px; */
  flex-direction: row;
}
</style>