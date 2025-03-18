<template>
  <div class="semester-management">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <span class="title">学期信息</span>
          <div class="actions">
            <el-tooltip content="新建学期" placement="bottom">
              <el-icon @click="openDialog('create')" class="action-icon">
                <Plus />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
      </template>

      <div class="content">
        <div v-if="semesters.length" class="semester-list">
          <div v-for="(semester, index) in semesters" :key="index" class="semester-info">
            <div class="info-item">
              <span class="label">学期名称：</span>
              <span class="value">{{ semester.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">开始日期：</span>
              <span class="value">{{ formatDate(semester.startDate) }}</span>
            </div>
            <div class="info-item">
              <span class="label">结束日期：</span>
              <span class="value">{{ formatDate(semester.endDate) }}</span>
            </div>
            <div class="info-item">
              <span class="label">学校名称：</span>
              <span class="value">{{ semester.schoolName || '未填写' }}</span>
            </div>
            <div class="info-item">
              <span class="label">二级学院名称：</span>
              <span class="value">{{ semester.collegeName || '未填写' }}</span>
            </div>
            <div class="info-item">
              <span class="label">班级名称：</span>
              <span class="value">{{ semester.className || '未填写' }}</span>
            </div>
            <div class="info-actions">
              <el-button @click="openDialog('edit', semester)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteSemester(index)" type="text" size="small" class="delete-button">删除</el-button>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p class="empty-tip">当前没有学期信息</p>
          <p class="empty-desc">点击右上角按钮创建新的学期</p>
        </div>
      </div>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      style="border-radius: 15px";
      custom-class="semester-dialog"
    >
      <el-form label-width="120px" class="edit-form">
        <el-form-item label="学期名称">
          <el-input v-model="form.name" placeholder="请输入学期名称" />
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="form.startDate"
            placeholder="选择开始日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="form.endDate"
            placeholder="选择结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input v-model="form.schoolName" placeholder="请输入学校名称" />
        </el-form-item>
        <el-form-item label="二级学院名称">
          <el-input v-model="form.collegeName" placeholder="请输入二级学院名称" />
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="form.className" placeholder="请输入班级名称" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSemester">{{ dialogTitle === '编辑学期' ? '保存' : '新建' }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Edit, Plus } from '@element-plus/icons-vue';

export default defineComponent({
  components: { Edit, Plus },
  setup() {
    const semesters = ref([]);
    const dialogVisible = ref(false);
    const dialogTitle = ref('');
    const form = ref({
      name: '',
      startDate: null,
      endDate: null,
      schoolName: '',
      collegeName: '',
      className: ''
    });

    const openDialog = (action, semester = {}) => {
      dialogTitle.value = action === 'edit' ? '编辑学期' : '新建学期';
      form.value = {
        ...semester,
        startDate: semester.startDate ? new Date(semester.startDate).toISOString().split('T')[0] : null,
        endDate: semester.endDate ? new Date(semester.endDate).toISOString().split('T')[0] : null
      };
      dialogVisible.value = true;
    };

    const saveSemester = () => {
      if (dialogTitle.value === '编辑学期') {
        const index = semesters.value.findIndex(s => s.name === form.value.name);
        semesters.value[index] = { ...form.value };
      } else {
        semesters.value.push({ ...form.value });
      }
      dialogVisible.value = false;
      resetForm();
    };

    const deleteSemester = (index) => {
      semesters.value.splice(index, 1);
    };

    const resetForm = () => {
      form.value = {
        name: '',
        startDate: null,
        endDate: null,
        schoolName: '',
        collegeName: '',
        className: ''
      };
    };

    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      if (isNaN(d.getTime())) return '';
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}年${month}月${day}日`;
    };

    return {
      semesters,
      dialogVisible,
      dialogTitle,
      form,
      openDialog,
      saveSemester,
      deleteSemester,
      formatDate
    };
  }
});
</script>

<style scoped>
.semester-management {
  height: 100vh;
  padding: 24px;
  background: #f0f2f5;
}

.main-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(16, 24, 40, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #ebedf0;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.actions .action-icon {
  font-size: 1.25rem;
  color: #409eff;
  cursor: pointer;
  transition: color 0.2s;
}

.actions .action-icon:hover {
  color: #2b6bd3;
}

.content {
  padding: 24px;
}

.semester-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.semester-info {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.label {
  font-weight: 500;
  color: #666;
}

.value {
  color: #333;
  font-size: 1rem;
}

.info-actions {
  display: flex;
  gap: 8px;
}

.delete-button {
  color: #ff4d4f;
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
}

.empty-img {
  width: 200px;
  margin-bottom: 16px;
}

.empty-tip {
  font-size: 1.125rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.empty-desc {
  color: #666;
  font-size: 0.975rem;
}

.semester-dialog .el-dialog__header {
  background: #409eff;
  color: white;
  padding: 16px 24px;
  border-radius: 16px 16px 0 0;
  font-size: 1.2rem;
}

.semester-dialog .el-dialog__body {
  padding: 24px;
  background: #f9f9f9;
}

.edit-form {
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-footer {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  background: #f9f9f9;
  border-top: 1px solid #ebedf0;
  border-radius: 0 0 16px 16px;
}
</style>    