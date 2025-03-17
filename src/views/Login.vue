<template>
    <el-container style="
        height: 100%; width: 100%; background-color: #f5f5f5;
    ">
        <el-card class="login-card" shadow="power">
            <el-container dir="horizontal" style="width: 100%; display: flex; justify-content: space-between;">
                <!-- <el-container style="
                    background-color: #fff; margin-right: 20px; width: 150px; border-radius: 15px;
                ">
                    <el-header style="display: flex; justify-content: center; height: 30px; margin-top: 15px; margin-bottom: 15px;">
                        <el-text type="info" style="font-size: 1rem;">快捷登入</el-text>
                    </el-header>
                    <el-footer>
                        <el-menu style="border: none;">
                            <el-menu-item index="1">
                                
                            </el-menu-item>
                        </el-menu>
                    </el-footer>
                </el-container> -->

                <el-container dir="vertical" style="background-color: #fff; border-radius: 15px; width: 600px;">
                    <el-header style="
                    display: flex; align-items: center; height: 40px; margin-top: 30px;
                    ">
                        <el-icon size="20">
                            <svg t="1740830022058" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2302" width="200" height="200"><path d="M498.602667 191.744a204.714667 204.714667 0 0 1 116.906666 372.8c133.162667 47.317333 229.077333 173.290667 231.893334 322.026667l0.085333 6.784h-64c0-157.333333-127.573333-284.885333-284.885333-284.885334-155.136 0-281.301333 123.968-284.821334 278.250667l-0.085333 6.613333h-64c0-151.68 96.810667-280.746667 232-328.810666a204.714667 204.714667 0 0 1 116.906667-372.8z m0 64a140.714667 140.714667 0 1 0 0 281.450667 140.714667 140.714667 0 0 0 0-281.450667z" fill="#1677FF" p-id="2303"></path></svg>
                        </el-icon>
                        <el-text type="primary" style="margin-left: 15px; font-size: 1rem">登入账户以使用</el-text>
                    </el-header>
                    <el-footer style="margin-top: 20px; height: auto; margin-bottom: 30px;">
                        <el-form label-position="top">
                            <el-form-item label="用户名">
                                <el-input placeholder="请输入用户名" v-model="username" />
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input placeholder="请输入密码" show-password v-model="password"/>
                            </el-form-item>
                        </el-form>
                        <el-container dir="horizontal" style="display: flex; justify-content: space-between;">
                            <el-button type="primary" @click="login" style="width: 100%; margin-top: 20px;">登入</el-button>
                            <el-button type="primary" @click="createUser" plain style="width: 100%; margin-top: 20px;">创建用户</el-button>
                        </el-container>
                    </el-footer>
                </el-container>
            </el-container>
        </el-card>
    </el-container>
</template>

<style scoped>
.login-card {
    width: auto; height: auto;
    margin: auto; border: none; background-color: transparent;
}
</style>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
import axios from 'axios';
import { getBackendHost } from '@/assets/libs/backend';
const host = getBackendHost();

const router = useRouter()

// 登录模块
const username = ref('')
const password = ref('')
const login = () => { // 登入
    // 拿到表单数据
    let data = {
        username: username.value,
        password: password.value
    }
    // 检查数据是否为空
    if (data.username == '' || data.password == ''){
        showWarningMsg('请输入用户名和密码')
        return
    }else {
        // 发送请求
        const api = '/login/verify?'
        const query = "t=" + new Date().getTime() + "&v=1" + "&uname=" + data.username + "&pwd=" + data.password
        const apiurl = host + api + query
        axios.get(apiurl, {
        }).then((res) => {
            console.log(res.data)
            // 登入成功
            if (res.data.status == 200){
                showSuccessMsg('登录成功')
                // 写入localStorage
                const loginedUserInfo = {
                    username: res.data.userinfo.name,
                    level: res.data.userinfo.level,
                    token: res.data.userinfo.token
                }
                localStorage.setItem('loginedUserInfo', JSON.stringify(loginedUserInfo))
                // // 写入store
                // store.commit('loginedUserInfo', loginedUserInfo)
                // 跳转页面
                router.push({
                    name: 'Home',
                    params: {
                        user: JSON.parse(localStorage.getItem('loginedUserInfo')).username
                    }
                })
            } else if (res.data.status == 404 ){
                showWarningMsg('未找到该用户')
            } else if (res.data.status == 204){
                showWarningMsg('密码错误')
            } else if (res.data.status == 205){
                showWarningMsg('服务器已拒绝该用户的登录请求')
            } else {
                showErrorMsg('未知错误，请稍后再试')
            }
        }).catch((err) => {
            showErrorMsg('未知错误，请稍后再试')
            console.log(err)
        })
    }
}
const createUser = () => { // 创建用户
    // 拿到表单数据
    let data = {
        username: username.value,
        password: password.value
    }
    // 检查数据是否为空
    if (data.username == '' || data.password == ''){ 
        showWarningMsg('请输入用户名和密码')
        return
    }else {
        // 发送请求
        const api = '/login/create?'
        const query = "t=" + new Date().getTime() + "&v=1" + "&uname=" + data.username + "&pwd=" + data.password
        const apiurl = host + api + query
        axios.get(apiurl, {
        }).then((res) => {
            if( res.data.status == 200){
                showSuccessMsg('创建用户成功')
            } else if (res.data.status == 201 ){
                showWarningMsg('该用户名已存在')
            } else {
                showErrorMsg('未知错误，请稍后再试')
            }
            console.log(res.data)
        }).catch((err) => {
            showErrorMsg('未知错误，请稍后再试')
            console.log(err)
        })
    }
}

// 提示模块
const showWarningMsg = (message) => {
    ElMessage({
        message: message,
        type: 'warning',
        showClose: true
    })
}
const showSuccessMsg = (message) => {
    ElMessage({
        message: message,
        type: 'success',
        showClose: true
    })
}
const showErrorMsg = (message) => {
    ElMessage({
        message: message,
        type: 'error',
        showClose: true
    })
}
showWarningMsg('请先登入账户')
</script>