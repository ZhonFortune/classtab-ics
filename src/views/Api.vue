<template>
    <el-container class="container">
        <el-header style="height: auto; width: 100%; margin-top: 15px;">
            <el-card v-for="(item, index) in apiList" :key="index" class="api-card" shadow="hidden">
                <el-descriptions title="" :column="2" border>
                    <el-descriptions-item label="接口名称" label-align="left">
                        <el-text>{{ item.name }}</el-text>
                    </el-descriptions-item>
                    <el-descriptions-item label="状态" label-align="right">
                        <el-tag :type="item.status === '在线' ? 'success' : 'danger'">{{ item.status }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="请求地址" :span="2">
                        <el-link type="primary" :href="item.url" target="_blank">{{ item.url }}</el-link>
                    </el-descriptions-item>
                    <el-descriptions-item label="请求方式">
                        <el-tag>{{ item.method }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="请求参数" label-align="right">
                        <span v-if="item.params">{{ JSON.stringify(item.params, null, 2) }}</span>
                        <span v-else>无</span>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </el-header>

        <el-footer style="width: 100%; display: flex; justify-content: flex-start; padding-bottom: 120px;">
            <el-button type="primary" @click="getApiList" style="margin-left: 20px;">刷新列表</el-button>
        </el-footer>
    </el-container>
</template>

<style scoped>
.container {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
    margin-bottom: 50px;
}

.api-card {
    width: 100%;
    margin-bottom: 20px;
    border: 0;
}
</style>

<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';

// 读取后端地址，增加默认值防止 JSON 解析错误
const host = "http://" + JSON.parse(localStorage.getItem('backendHost')).host || 'http://127.0.0.1:6058'

// API 列表
const apiList = ref([]);

// 获取 API 列表
const getApiList = async () => {
    const path = '/api/getlist';
    const url = host + path;

    try {
        const res = await axios.get(url);
        const temp = res.data.list;

        // 检测 API 状态
        const promises = temp.map(async (item) => {
            const apiUrl = `${host}${item.url}`;
            try {
                await axios.get(apiUrl);
                item.status = '在线';
            } catch (err) {
                item.status = '离线';
            }
            return {
                status: item.status,
                name: item.name,
                url: apiUrl,
                method: item.method,
                params: item.params,
            };
        });

        apiList.value = await Promise.all(promises);
    } catch (error) {
        ElMessage.error('获取 API 列表失败');
        console.error(error);
    }
};

// 组件挂载时自动获取 API 列表
onMounted(() => {
    getApiList();
});
</script>