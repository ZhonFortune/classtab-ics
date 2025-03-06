<template>
  <div class="page-container">
    <h2 class="page-title">课程节时配置</h2>

    <el-tabs v-model="activeTab" class="tabs-container" border>
      <el-tab-pane label="添加课程节时配置" name="add">
        <el-tabs v-model="mode" class="mode-tabs" type="border-card">
          <!-- 自动填充模式 -->
          <el-tab-pane label="自动填充模式" name="auto">
            <el-form label-width="180px" class="form-container">
              <el-divider>课程设置</el-divider>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="上午课数">
                    <el-input-number v-model="autoConfig.morningCount" :min="0" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="上午第一节课">
                    <el-time-picker v-model="autoConfig.morningStart" format="HH:mm" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="下午课数">
                    <el-input-number v-model="autoConfig.afternoonCount" :min="0" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="下午第一节课">
                    <el-time-picker v-model="autoConfig.afternoonStart" format="HH:mm" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="晚修课数">
                    <el-input-number v-model="autoConfig.eveningCount" :min="0" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="晚修第一节课">
                    <el-time-picker v-model="autoConfig.eveningStart" format="HH:mm" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider>时间设置</el-divider>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="每节课时长(分钟)">
                    <el-input-number v-model="autoConfig.classDuration" :min="1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="课间休息(分钟)">
                    <el-input-number v-model="autoConfig.breakTime" :min="0" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item class="form-actions">
                <el-button type="primary" @click="generateAutoSchedule">预览</el-button>
              </el-form-item>
            </el-form>

            <el-divider>预览</el-divider>
            <el-table :data="autoSchedule" border>
              <el-table-column prop="index" label="节次" width="50" />
              <el-table-column prop="startTime" label="上课时间" />
              <el-table-column prop="endTime" label="下课时间" />
            </el-table>
          </el-tab-pane>

          <!-- 自定义模式 -->
          <el-tab-pane label="自定义模式" name="custom">
            <el-form label-width="150px" class="form-container">
              <div class="custom-actions">
                <el-button type="primary" @click="addCustomClass">添加课程</el-button>
              </div>
              <div v-for="(item, index) in customSchedule" :key="index" class="custom-class">
                <span>第{{ index + 1 }}节</span>
                <el-time-picker v-model="item.startTime" format="HH:mm" placeholder="上课时间" />
                <el-time-picker v-model="item.endTime" format="HH:mm" placeholder="下课时间" />
                <el-button type="danger" @click="removeCustomClass(index)">删除</el-button>
              </div>

              <el-form-item class="form-actions">
                <el-button type="primary" @click="previewCustomSchedule">预览</el-button>
              </el-form-item>
            </el-form>

            <el-divider>预览</el-divider>
            <el-table :data="customSchedule" border>
              <el-table-column label="节次" type="index" width="50" />
              <el-table-column prop="startTime" label="上课时间" />
              <el-table-column prop="endTime" label="下课时间" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane label="查看配置" name="view">
        
      </el-tab-pane>
    </el-tabs>

    <el-container class="submit-container">
      <el-button type="primary" plain @click="exportToICS" style="width: 150px; margin-bottom: 50px;">提交</el-button>
    </el-container>
    
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const activeTab = ref("add");
    const mode = ref("auto");

    const autoConfig = ref({
      morningCount: 4,
      morningStart: null,
      afternoonCount: 4,
      afternoonStart: null,
      eveningCount: 4,
      eveningStart: null,
      classDuration: 45,
      breakTime: 10,
    });

    const autoSchedule = ref([]);

    const generateAutoSchedule = () => {
      autoSchedule.value = [];

      const addSessions = (count, startTime) => {
        if (!startTime || count === 0) return;

        let currentTime = new Date(startTime);
        for (let i = 0; i < count; i++) {
          let start = new Date(currentTime);
          let end = new Date(currentTime);
          end.setMinutes(end.getMinutes() + autoConfig.value.classDuration);

          autoSchedule.value.push({
            index: autoSchedule.value.length + 1,
            startTime: start.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
            endTime: end.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
          });

          currentTime = new Date(end);
          if (i < count - 1) {
            currentTime.setMinutes(currentTime.getMinutes() + autoConfig.value.breakTime);
          }
        }
      };

      addSessions(autoConfig.value.morningCount, autoConfig.value.morningStart);
      addSessions(autoConfig.value.afternoonCount, autoConfig.value.afternoonStart);
      addSessions(autoConfig.value.eveningCount, autoConfig.value.eveningStart);
    };

    const customSchedule = ref([]);

    const addCustomClass = () => {
      customSchedule.value.push({ startTime: null, endTime: null });
    };

    const removeCustomClass = (index) => {
      customSchedule.value.splice(index, 1);
    };

    console.log(customSchedule.value);
    
    return {
      activeTab,
      mode,
      autoConfig,
      autoSchedule,
      generateAutoSchedule,
      customSchedule,
      addCustomClass,
      removeCustomClass,
    };
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;
  padding-bottom: 50px;
}

.page-title {
  text-align: left;
  margin-bottom: 20px;
}

.tabs-container {
  flex: 1;
  margin-bottom: 50px;
}

.form-container {
  width: 100%;
  padding: 20px;
}

.form-actions {
  margin-top: 20px;
}

.submit-container {
  display: flex;
  width: 100%; height: 50px; margin-bottom: 25px;
  justify-content: flex-start; align-items: center;
}
</style>