// @Function getBackendHost
// @Description 获取后端接口地址
import { ElMessage } from 'element-plus';
export const getBackendHost = () => {
    // 从 localStorage 中获取后端主机地址
    let backendHostData = localStorage.getItem('backendHost');
    let host;

    // 如果 localStorage 中没有后端主机地址，使用默认值
    if (backendHostData) {
        try {
            const parsedData = JSON.parse(backendHostData);
            if (parsedData.host) {
                host = "http://" + parsedData.host;
            } else {
                ElMessage.error('未找到后端接口地址');
            }
        } catch (error) {
            console.error('解析后端接口地址失败', error);
        }
    } else {
        // 只在没有存储值的情况下显示提示
        ElMessage.error('请先设置后端接口地址');
    }

    return host;
}
