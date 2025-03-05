<template>
  <el-container class="about-container">
    <el-main class="main-content">
      <!-- 项目介绍 -->
      <el-card class="scrollable-card">
        <h2>项目介绍 ✅</h2>
        <p style="margin-top: 15px; margin-bottom: 15px;">
          本项目致力于为学生提供便捷的课表查询和课程提醒功能。通过使用 Vue.js 和 Element Plus 框架，我们构建了一个现代化的 Web 应用程序，用户可以轻松地查看和管理自己的课程表。
            我们还为项目添加了ICS文件功能，用户可以方便地将课表信息导出为ICS文件，以便在其他日历应用程序中使用。您亦可以选择通过使用您的IPHONE手机，通过扫描QRcode，将订阅日历添加到您的APPLE日历中。
            订阅日历课根据您的课表自动更新，您无需手动同步。这方便您应对学校的临时调课。我们将在不久的将来接入各大学校教务系统，提供更加便捷快速的课表查询服务。
        </p >
      </el-card>

      <el-divider />

      <!-- 核心贡献者 -->
      <h2 class="section-title">核心贡献者</h2>
      <el-row :gutter="20" justify="center">
        <el-col v-for="(contributor, index) in contributors" :key="index" :xs="24" :sm="12" :md="8" :lg="6">
          <el-card shadow="hover" class="team-card">
            <el-avatar :size="80" :src="contributor.avatar" />
            <h3>{{ contributor.name }}</h3>
            <p>{{ contributor.role }}</p >
            <el-button link type="primary" plain="true">联系我</el-button>
          </el-card>
        </el-col>
      </el-row>

      <el-divider />

      <!-- 如何参与 -->
      <el-card class="scrollable-card">
        <h2>如何参与 🔩</h2>
        <p>我们欢迎所有对项目感兴趣的开发者参与贡献！您可以：</p >
        <ul style="margin-top: 15px; margin-bottom: 15px;">
          <li>在 <el-button link @click="githubUrl" target="_blank">GitHub</el-button> 上提交 Issue 或 Pull Request</li>
          <li>加入我们的社区，与其他开发者交流</li>
          <li>帮助改进文档或撰写教程</li>
        </ul>
      </el-card>

      <el-divider />

      <!-- 联系方式 -->
      <el-card class="scrollable-card" style="margin-bottom: 100px;">
        <h2>联系我们 📝</h2>
        <el-descriptions border :column="1" style="margin-top: 15px; margin-bottom: 15px;">
          <el-descriptions-item label="GitHub">
            <el-button link type="primary" @click="githubUrl" target="_blank">跳转GitHub</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="社区讨论">
            <el-button link type="info" disabled @click="communityUrl" target="_blank">(我们将根据使用人数以及需求决定是否开放社区讨论)</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="邮件">
            <el-button link type="primary" @click="contactEmail">连接我的邮箱</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const contributors = ref([
  { name: 'Moe.', role: '核心开发者', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Alice' },
  { name: '[期待你的加入]', role: '文档维护者', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Bob' },
  { name: '[期待你的加入]', role: '社区运营', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Charlie' },
  { name: '[期待你的加入]', role: '代码贡献者', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=David' }
]);

const githubUrl = () => {
    window.open('https://github.com/ZhonFortune/classtab-ics', '_blank');
}

const communityUrl = () => {
    ElMessage({
        message: '敬请期待',
        type: 'info',
    })
}

const contactEmail = () => {
    window.open('mailto:zhonfortune@outlook.com', '_blank');
}
</script>

<style scoped>
.about-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.scrollable-card {
  margin-bottom: 20px;
  padding: 20px;
  border: 0;
}

.section-title {
  text-align: center;
  margin: 20px 0;
  color: #333;
}

.team-card {
  text-align: center;
  padding: 20px;
  border: 0px;
}

.team-card h3 {
  margin: 10px 0 5px;
}

.team-card p {
  color: #666;
  font-size: 14px;
}
</style>