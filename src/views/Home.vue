<template>
  <el-container style="
    height: 100%; padding: 0px; margin: 0px; width: 100%;
  ">
    <el-aside style="
      width: 470px; height: 100%; padding: 0px; margin: 0px;
      display: flex; flex-direction: column; align-items: center; justify-content: start;
    ">
      <el-card class="card-general card1" id="QuickQRcode" shadow="hide" body-style="
        width: 100%; margin: 0px; padding: 15px; border: none;
      ">
        <el-container style="
          width: 100%; height: 100%; padding: 0px; margin: 0px;
        ">
          <el-aside style="
            width: 160px; height: 100%; padding: 0px; margin: 0px;
            display: flex; flex-direction: column; align-items: center;
          ">
            <el-tooltip placement="bottom" content="用您的IPHONE扫描此二维码即可快速添加至日历APP" effect="light">
              <!-- <el-image :src="QRcodeURL" style="height: 160px; width: 160px; cursor: pointer;" /> -->
              <canvas style="height: 160px; width: 160px; cursor: pointer;"></canvas>
            </el-tooltip>
          </el-aside>
          <el-main style="
            width: 100%; padding: 0px; margin: 10px 0px 10px 15px;
            display: flex; flex-direction: column; align-items: start; justify-content: space-between;
          ">
            <el-text style="font-size: 1rem; font-weight: 600; color: black">扫码以快速添加至您的IPHONE</el-text>
            <div style="
              width: 100%; height: 20px; padding: 0; margin-top: 30px;
              display: flex; flex-direction: row; align-items: center;
            ">
              <el-image style="height: 20px; width: 20px;"
                src='https://help.apple.com/assets/6758C14AEA2BBD75D7023772/6758C14FEA2BBD75D702377E/zh_CN/de26b8cef467bff3fb0e82c194a55e94.png' />
              <el-image style="height: 20px; width: 20px; margin-left: 10px;"
                src='https://help.apple.com/assets/6758C14AEA2BBD75D7023772/6758C14FEA2BBD75D702377E/zh_CN/224e500e33800bab41d4d52df6690f11.png' />
            </div>
            <el-button link type="primary" @click="appleSupport102680" target="_blank
            ">
              如何使用IPHONE扫描二维码 ?
            </el-button>
          </el-main>
        </el-container>
      </el-card>

    </el-aside>

    <el-main style="
      width: 100%; height: 100%; padding: 0px; margin: 0px;
    ">
      <el-calendar ref="calendar" @select-date="selectDate">
        <template #header="{ data }" style="
          border: none;
        ">
          <span>快捷课表</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-month')">上个月</el-button>
            <el-button size="small" type="primary" @click="selectDate('today')">当前天数</el-button>
            <el-button size="small" @click="selectDate('next-month')">下个月</el-button>
          </el-button-group>
        </template>
      </el-calendar>
    </el-main>
  </el-container>
</template>

<style scoped>
.card-general {
  /* box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px; */
  border-radius: 5px; border: none;
  display: flex; flex-direction: row; align-items: center; justify-content: space-between;
  margin: 15px 0px 15px 0px; width: 90%;
}
.card1 {
  height: 220px; 
}
.card2 {
  height: 110px;
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import QRcode from 'qrcode'
import axios from 'axios'

// 日历模块

const calendar = ref(null); 
const selectDate = (val) => { 
  if (!calendar.value) return;
  calendar.value.selectDate(val);
};

// 用户模块
const route = useRoute()
const router = useRouter()
const user = route.params.user
// 检查是否有参数
if (!user) {
  router.push({ name: 'Login' })
} else if (user) {
  const loginedUserInfo = localStorage.getItem('loginedUserInfo')
  if (loginedUserInfo) {
    const loginedUser = JSON.parse(loginedUserInfo).username
    if (loginedUser !== user) {
      router.push({ name: 'NotLogin' })
    }
  } else {
    // 没有登录信息，重定向到登录页面
    router.push({ name: 'Login' })
  }
}else if (!user) {
  // 如果没有参数 则检查是否有登录信息
}

// 获取登录用户下的课程表
const host = "http://127.0.0.1:6058"
const getUserClassTable = () => {
  // 获取用户信息
  const uname = JSON.parse(localStorage.getItem('loginedUserInfo')).username
  const utoken = JSON.parse(localStorage.getItem('loginedUserInfo')).token
  // 请求后端拿到用户
  const path = '/class/getlist?' + 'utoken=' + utoken
  const url = host + path
  axios.get(url, {}).then((res) => {
  }).catch((err) => {
    console.log(err)
  })
}

// 在组件挂载时执行
onMounted(() => {
  // getUserClassTable()
});


</script>

<script lang="ts">
export default {
  name: 'Home',
  methods: {
    appleSupport102680() {
      window.open('https://support.apple.com/zh-cn/102680',"_blank")
    }
  }
}
</script>