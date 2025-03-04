<template>
    <el-container style="
        height: 100%; width: 100%; display: flex; align-items: center;
        /* background-color: #f5f5f5; */
    ">
        <el-header style="height: auto; width: 99%; margin-top: 5px; display: flex; align-items: center;">
            <!-- 动态展示 API 列表 -->
            <el-container direction="vertical" style="width: 100%; display: flex; justify-content: center; margin-bottom: 10px;
            ">
                <el-header v-for="(item, index) in apiList" :key="index" style="padding: 0; width: 100%; height: auto;">
                    <el-descriptions style="width: 100%;
                        margin-top: 20px; margin-bottom: 20px; border-bottom: 0.3px solid #f1f1f1;
                    " label-position="left">
                        <template #title>
                            <el-container direction="horizontal" style="display: flex; align-items: center;">
                                <el-text type="default" style="font-size: 1.5rem; color: #000">{{ item.name }}</el-text>
                                <el-tag :type="item.status == '在线' ? 'success' : 'error'" style="margin-left: 10px;">{{ item.status }}</el-tag>
                            </el-container>
                        </template>
                        <el-descriptions-item label="请求地址">{{ item.url }}</el-descriptions-item>
                        <el-descriptions-item label="请求方式" style="display: flex; justify-content: center;">
                            <el-tag>{{ item.method }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="请求参数">
                            <div v-if="Array.isArray(item.params)">
                                <span v-for="(param, idx) in item.params" :key="idx">{{ param }}{{ idx <
                                        item.params.length - 1 ? ', ' : '' }}</span>
                            </div>
                            <div v-else-if="typeof item.params === 'object' && item.params !== null">
                                <span v-for="(value, key, idx) in item.params" :key="key">{{ key }}: {{ value }}{{ idx <
                                    Object.keys(item.params).length - 1 ? ', ' : '' }}</span>
                            </div>
                            <div v-else>
                                {{ item.params }}
                            </div>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-header>
            </el-container>
        </el-header>
        <!-- 可根据需要添加 el-footer 内容 -->
        <el-footer></el-footer>
    </el-container>
</template>

<style scoped>
/* 可以添加一些自定义样式 */
</style>

<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';

// 定义 API 列表响应式变量
const apiList = ref([]);

// 获取API列表
const getApiList = async () => {
    const host = 'http://127.0.0.1:6058';
    const path = '/api/getlist';
    const url = host + path;
    try {
        const res = await axios.get(url);
        const temp = res.data.data.list;
        const promises = temp.map(async (item) => {
            const apiUrl = host + item.url;
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
                params: item.params
            };
        });
        const results = await Promise.all(promises);
        apiList.value = results;
        console.log(apiList.value);
    } catch (error) {
        ElMessage.error({
            message: '获取API列表失败',
            type: 'error',
            showClose: true
        });
        console.error(error);
    }
};

// 在组件挂载时获取API列表
onMounted(() => {
    getApiList();
});

</script>

<script>
export default {
    name: 'Api'
}
</script>

