<template>
    <div class="not-found-container">
        <div class="message">
            <h1>404 - 页面未找到</h1>
            <p>哎呀，你访问的页面好像藏起来啦，请检查一下 URL 或者回到熟悉的地方吧</p>
            <div class="button-group">
                <el-button type="primary" @click="backHome" class="home-button">
                    <span>返回主页</span>
                </el-button>
                <el-button type="primary" @click="goLogin" class="login-button">
                    <span>前往登录页</span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const backHome = () => {
    if (localStorage.getItem('loginedUserInfo')) {
        router.push({
            name: 'Home',
            params: {
                user: JSON.parse(localStorage.getItem('loginedUserInfo')).username
            }
        })
    } else if (!localStorage.getItem('loginedAdminInfo')) {
        router.push({
            name: 'Login'
        })
    }
}

const goLogin = () => {
    router.push('/login')
}
</script>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
.not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #ffffff;
    font-family: 'Open Sans', sans-serif;
}

.message {
    text-align: center;
    padding: 40px;
    border-radius: 15px;
    /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); */
    background-color: #ffffff;
    animation: fadeInUp 0.8s ease-out;
}

h1 {
    font-size: 64px;
    color: #333333;
    margin-bottom: 15px;
    letter-spacing: -1px;
}

p {
    font-size: 18px;
    color: #666666;
    margin-bottom: 30px;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
}

router-link {
    display: inline-block;
    padding: 12px 28px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s ease;
}

router-link:nth-child(1) {
    background-color: #007BFF;
    color: #ffffff;
}

router-link:nth-child(1):hover {
    background-color: #0056b3;
}

router-link:nth-child(2) {
    background-color: #f8f9fa;
    color: #333333;
    border: 1px solid #ccc;
}

router-link:nth-child(2):hover {
    background-color: #e2e6ea;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>