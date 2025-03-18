<template>
    <el-container class="container">
        <el-header class="header">
            <el-button type="primary" @click="getApiList">刷新列表</el-button>
        </el-header>
        <el-main class="main">
            <el-table 
                :data="apiList"
                stripe
                style="width: 100%; margin: 0 auto;"
                show-overflow-tooltip
                table-layout="fixed"
                :row-style="{height: '120px'}"
            >
                <el-table-column prop="name" label="接口名称"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template #default="{ row }">
                        <el-tag :type="row.status === '在线' ? 'success' : 'danger'">{{ row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="url" label="请求地址">
                    <template #default="{ row }">
                        <el-link type="primary" :href="row.url" target="_blank">{{ row.url }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="method" label="请求方式">
                    <template #default="{ row }">
                        <el-tag>{{ row.method }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="params" label="请求参数">
                    <template #default="{ row }">
                        <span v-if="row.params">{{ JSON.stringify(row.params, null, 2) }}</span>
                        <span v-else>无</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="footer">
            
        </el-footer>
    </el-container>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    overflow-y: auto;
}

.header {
    display: flex; width: 100%;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e4e7ed;
}

.main {
    flex: 1; width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
}

.footer {
    padding: 15px 20px;
    background-color: #f5f7fa;
    border-top: 1px solid #e4e7ed;
    text-align: center;
}

.el-table .el-table__cell {
    display: flex;
    align-items: center;
}

.el-table__row:nth-child(even) {
    background-color: #f9fafb;
}
</style>

<script setup>
import { getBackendHost } from '@/assets/libs/backend';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';

// 读取后端地址，增加默认值防止 JSON 解析错误
const host = getBackendHost();

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
        ElMessage.success('获取 API 列表成功');
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