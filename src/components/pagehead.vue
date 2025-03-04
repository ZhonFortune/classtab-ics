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
          </el-container>

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
import { ElDrawer,ElButton } from 'element-plus'
const drawer1 = ref(false)

const displayLoginedUser = ref('未登录')
</script>

<script lang="js">
import { ElMessage } from 'element-plus';
export default {
  name: 'pagehead',
  data() {
    return {
      displayLoginedUser: ref(this.$store),
    }
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