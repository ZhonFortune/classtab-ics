<template>
  <el-container 
    class="setting-container"
    style="height: 100vh; display: flex; flex-direction: column;"
  >
    <el-main class="main-content" style="flex: 1; overflow-y: auto; padding: 20px;">
      <!-- 账号设置 -->
      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <h2>账号管理</h2>
          </div>
        </template>
        
        <el-form label-width="120px">
          <el-form-item label="用户名">
            <el-input 
              :value="username" 
              disabled
              placeholder="未登录"
            >{{ username || 'N/A' }}</el-input>
          </el-form-item>

          <el-form-item label="绑定邮箱">
            <el-input placeholder="请输入邮箱" disabled></el-input>
          </el-form-item>

          <el-form-item label="修改密码">
            <el-button type="primary" disabled>修改密码</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 后端设置 -->
      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <h2>后端接口设置</h2>
            <el-tooltip effect="light" content="设置您的API接口地址">
              <el-icon :size="16" class="ml-2">
                <svg t="1741239983384" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="200" height="200"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m-45.504-728v288.896a48 48 0 1 0 96 0V296a48 48 0 0 0-96 0z m48 496a48 48 0 1 0 0-96 48 48 0 0 0 0 96z" fill="#707070" p-id="2414"></path></svg>
              </el-icon>
            </el-tooltip>
          </div>
        </template>

        <el-form label-width="120px">
          <el-form-item label="后端地址">
            <el-input v-model="backendHost" placeholder="请输入后端接口地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveBackendHost">保存</el-button>
            <el-button @click="resetBackendHost">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 日历同步 -->
      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <h2>日历同步</h2>
            <el-tooltip effect="light" content="设置您的ICS日历文件同步时间间隔">
              <el-icon :size="16" class="ml-2">
                <svg t="1741239983384" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="200" height="200"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m-45.504-728v288.896a48 48 0 1 0 96 0V296a48 48 0 0 0-96 0z m48 496a48 48 0 1 0 0-96 48 48 0 0 0 0 96z" fill="#707070" p-id="2414"></path></svg>
              </el-icon>
            </el-tooltip>
          </div>
        </template>

        <el-form label-width="150px">
          <el-form-item label="自动同步">
            <el-switch disabled></el-switch>
          </el-form-item>

          <el-form-item label="同步频率">
            <el-select disabled>
              <el-option label="每天" value="daily"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="sync-buttons" style="padding: 15px 20px;">
          <el-button 
            type="primary" 
            disabled
          >
            立刻同步
          </el-button>
        </div>
      </el-card>

      <!-- 界面布局 -->
      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <h2>界面布局</h2>
          </div>
        </template>

        <el-form label-width="120px">
          <el-form-item label="侧边栏折叠">
            <el-switch disabled></el-switch>
          </el-form-item>

          <el-form-item label="主题颜色">
            <el-color-picker disabled></el-color-picker>
          </el-form-item>

          <el-form-item label="字体大小">
            <el-slider :min="12" :max="24" step="2" disabled></el-slider>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 隐私设置 -->
      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <h2>隐私设置</h2>
          </div>
        </template>

        <el-checkbox-group disabled>
          <el-checkbox label="允许数据统计"></el-checkbox>
          <el-checkbox label="调试模式"></el-checkbox>
        </el-checkbox-group>
      </el-card>
    </el-main>

    <el-footer style="padding: 20px;">
      <el-button type="primary" disabled>保存设置</el-button>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
// 读取本地存储的用户信息
const userInfo = JSON.parse(localStorage.getItem('loginedUserInfo')) || {};

// 账号设置
const username = ref(userInfo.username || '');
const email = ref(userInfo.email || '');

// 读取后端接口设置（默认 127.0.0.1:6058）
const backendSettings = JSON.parse(localStorage.getItem('backendHost')) || { host: '127.0.0.1:6058' };
const backendHost = ref(backendSettings.host);

// 保存后端地址到 localStorage
const saveBackendHost = () => {
  localStorage.setItem('backendHost', JSON.stringify({ host: backendHost.value }));
  ElMessage.success('后端地址已更新');
};

// 还原后端地址到默认值
const resetBackendHost = () => {
  backendHost.value = '127.0.0.1:6058';
  localStorage.setItem('backendHost', JSON.stringify({ host: backendHost.value }));
  ElMessage.success('后端地址已设置为默认值');
}


</script>

<style scoped>
.setting-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.card-item {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.card-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.sync-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px 20px;
}

.el-tooltip {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .sync-buttons {
    justify-content: flex-start;
    padding: 10px;
  }
}
</style>