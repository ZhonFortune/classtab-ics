export const getBackendHost = () => {
    let backendHostData = localStorage.getItem('backendHost');
    let host;
    if (backendHostData) {
        try {
            const parsedData = JSON.parse(backendHostData);
            if (parsedData.host) {
                host = "http://" + parsedData.host;
            } else {
                host = 'http://127.0.0.1:6058';
            }
        } catch (error) {
            // 如果解析 JSON 出错，使用默认值
            host = 'http://127.0.0.1:6058';
        }
    } else {
        host = 'http://127.0.0.1:6058';
    }
    return host;
}