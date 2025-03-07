<template>
  <div class="page-container">
    <el-container style="
      height: 50px; width: 100%; display: flex; align-items: center; justify-content: flex-start;
      margin-top: 10px; margin-bottom: 15px;
    ">
      <el-button type="primary" @click="getDurationList">刷新列表</el-button>
    </el-container>

    <el-tabs v-model="activeTab" class="tabs-container" border @tab-click="handleTabClick">
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
                <el-time-picker v-model="item.endTime" format="HH:mm" placeholder="下课时间" style="margin-left: 10px;" />
                <el-button type="danger" @click="removeCustomClass(index)" style="margin-left: 10px;">删除</el-button>
              </div>

              <!-- <el-form-item class="form-actions">
                <el-button type="primary" @click="previewCustomSchedule">预览</el-button>
              </el-form-item> -->
            </el-form>

            <el-divider>预览</el-divider>
            <el-table :data="formattedCustomSchedule" border>
              <el-table-column prop="index" label="节次" width="50" />
              <el-table-column prop="startTime" label="上课时间" />
              <el-table-column prop="endTime" label="下课时间" />
            </el-table>
          </el-tab-pane>
        </el-tabs>

        <el-container class="submit-container">
          <el-button type="primary" plain style="width: 150px;" v-model="submitButton" @click="submitDuration"
            :loading="isLoading">提交</el-button>
          <el-input style="width: 350px; margin-left: 20px;" placeholder="请输入节时配置名称" v-model="durationName"></el-input>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="查看配置" name="view">
        <div v-for="(item, index) in durationList" :key="index" style="margin-top: 25px; margin-bottom: 30px;">
          <h3>配置名称:【 {{ item.name }} 】</h3>
          <el-table :data="item.data" border>
            <el-table-column prop="num" label="节次" width="50" />
            <el-table-column prop="start" label="上课时间" />
            <el-table-column prop="end" label="下课时间" />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import CryptoJS from "crypto-js";
import axios from "axios";

const host = "http://" + JSON.parse(localStorage.getItem('backendHost')).host || 'http://127.0.0.1:6058'

export default {
  setup() {
    const activeTab = ref("add");
    const mode = ref("auto");

    // 自动模式自动填充
    const autoConfig = ref({
      morningCount: 4,
      morningStart: new Date(new Date().setHours(8, 0, 0, 0)),
      afternoonCount: 4,
      afternoonStart: new Date(new Date().setHours(14, 30, 0, 0)),
      eveningCount: 4,
      eveningStart: new Date(new Date().setHours(19, 30, 0, 0)),
      classDuration: 45,
      breakTime: 10,
    });

    // 自动模式
    const autoSchedule = ref([]);

    // 预览自动模式
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

      // console.log(autoSchedule.value);

      addSessions(autoConfig.value.morningCount, autoConfig.value.morningStart);
      addSessions(autoConfig.value.afternoonCount, autoConfig.value.afternoonStart);
      addSessions(autoConfig.value.eveningCount, autoConfig.value.eveningStart);

      return autoSchedule
    };

    // 自定义模式
    const customSchedule = ref([]);

    // 添加自定义课程
    const addCustomClass = () => {
      customSchedule.value.push({ startTime: null, endTime: null });
    };

    // 删除自定义课程
    const removeCustomClass = (index) => {
      customSchedule.value.splice(index, 1);
    };

    // 预览自定义课程
    const formattedCustomSchedule = computed(() => {
      return customSchedule.value.map((item, index) => ({
        index: `${index + 1}`,
        startTime: item.startTime instanceof Date ? formatTime(item.startTime) : "",
        endTime: item.endTime instanceof Date ? formatTime(item.endTime) : "",
      }));
    });

    // 格式化时间为 "HH:mm"
    const formatTime = (date) => {
      if (!date || !(date instanceof Date)) return "";
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    // 节时名称
    const durationName = ref("");

    // 提交按钮
    const submitButton = ref("提交");
    const isLoading = ref(false);

    // 提交节时配置
    const submitDuration = () => {
      // TODO: 提交节时配置
      // 校验字段
      if (!durationName.value) {
        ElMessage.warning("请输入 节时配置 名称");
        return;
      }

      if (mode.value === "auto" && !autoConfig.value.morningStart) {
        ElMessage.warning("请填写 自动模式 配置");
        return;
      }

      if (mode.value === "custom" && customSchedule.value.length === 0) {
        ElMessage.warning("请添加 自定义 课程");
        return;
      }

      // CID生成
      function createCID() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let cid = "";
        for (let i = 0; i < 8; i++) {
          cid += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const token = JSON.parse(localStorage.getItem('loginedUserInfo')).token
        const cryUid = CryptoJS.MD5(token + cid).toString()
        return cryUid;
      }

      // 提交数据
      const uid = JSON.parse(localStorage.getItem('loginedUserInfo')).token
      const cid = createCID();
      const durationData = {
        uid: uid,
        cid: cid,
        name: durationName.value,
        data: mode.value === "auto" ? autoSchedule.value : formattedCustomSchedule.value,
      }

      // 按钮变为加载状态 v-model="submitButton"
      isLoading.value = true;
      submitButton.value = "提交中...";

      // 发送添加请求
      const path = `/class/duration/add`
      const url = host + path
      console.log(url);
      if (durationData.data.length === 0) {
        ElMessage.warning("请填写 节时配置");
        return;
      } else {
        try {
          axios({
            method: "post",
            url: url,
            dataType: "json",
            data: durationData,
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then(res => {
              console.log(res.data);
              if (res.data.status === 200) {
                ElMessage.success("节时配置已添加成功");
              } else if (res.data.status === 401) {
                ElMessage.warning("参数不可为空")
              } else if (res.data.status === 405) {
                ElMessage.error("添加失败: 数据库可能开小差了")
              } else {
                ElMessage.error("添加失败: 未知错误")
              }
            })
            .catch(error => {
              console.error(error);
              ElMessage.error("提交失败");
            });
        } catch (error) {
          console.error(error);
          ElMessage.error("提交失败");
        } finally {
          // 恢复按钮状态
          isLoading.value = false;
          submitButton.value = "提交";
        }
      }
    };

    // 查询配置
    const durationList = ref([]);
    const getDurationList = () => {

      // TODO: 查询配置
      const path = `/class/duration/get?`;
      const params = 'uid=' + JSON.parse(localStorage.getItem('loginedUserInfo')).token;
      const url = host + path + params;

      // 发送请求
      axios.get(url, {})
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            // 处理数据
            const data = res.data.data;
            const cids = []

            // 将数据按cid分组
            for (let i = 0; i < data.length; i++) {
              const item = data[i];
              const durationTemp = []

              //查询数量
              const currentCid = item.cid;
              if (!cids.includes(currentCid)) {
                cids.push(currentCid);
              } else {
                continue;
              }

              // 查询data中与cid对应的数据 放到durationList中
              for (let j = 0; j < data.length; j++) {
                const itemdata = data[j];
                if (itemdata.cid === currentCid) {
                  durationTemp.push(itemdata);
                }
              }

              // 将durationTemp添加到durationList中
              durationList.value.push({
                cid: currentCid,
                name: durationTemp[0].duraname,
                data: durationTemp,
              });
            }

            // 调试
            console.log(cids);
            console.log(durationList.value);

          } else {
            console.log("课程节时配置查询失败");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    // 处理标签页切换事件
    const handleTabClick = (tab) => {
      if (tab.name === 'view') {
        getDurationList();
      }
    };

    // 挂载
    onMounted(() => {
      getDurationList();
    });

    return {
      activeTab,
      mode,
      autoConfig,
      autoSchedule,
      generateAutoSchedule,
      customSchedule,
      addCustomClass,
      removeCustomClass,
      formattedCustomSchedule,
      durationName,
      submitDuration,
      formatTime,
      getDurationList,
      durationList,
      handleTabClick
    };
  }
}
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
  text-align: left;
  /* 预览按钮左对齐 */
}

.submit-container {
  display: flex;
  width: 100%;
  height: 80px;
  margin-bottom: 25px;
  margin-top: 50px;
  justify-content: flex-start;
  align-items: center;
}

.custom-class {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  /* 输入框之间的间隔 */
}

.custom-class span {
  margin-right: 10px;
}

.custom-actions {
  margin-bottom: 15px;
}

.custom-class .el-time-picker {
  margin-right: 10px;
}

/* 表格美化样式 */
.el-table {
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  /* box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); */
}

.el-table th {
  background-color: #f8f9fa;
  color: #333;
  font-weight: 500;
  padding: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.el-table td {
  padding: 12px;
  border-bottom: 1px solid #ebedf0;
  color: #666;
}

.el-table tr:hover {
  background-color: #f8f9fa;
}

.el-table__header {
  background-color: #f8f9fa;
}

.el-table__row {
  transition: background-color 0.3s ease;
}

.el-table__empty-text {
  color: #999;
  padding: 20px;
}

/* 配置标题样式 */
h3 {
  color: #333;
  font-size: 1.2em;
  margin-bottom: 15px;
  border-bottom: 2px solid #409eff;
  padding-bottom: 5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-table {
    width: 100%;
    overflow-x: auto;
  }
}
</style>