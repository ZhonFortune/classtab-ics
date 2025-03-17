<template>
  <div class="semester-management">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <span class="title">学期信息</span>
          <div v-if="currentSemester" class="actions">
            <el-tooltip content="编辑学期" placement="bottom">
              <el-icon @click="openEditDialog" class="action-icon">
                <Edit />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
      </template>

      <div class="content">
        <div v-if="currentSemester" class="semester-info">
          <div class="info-item">
            <span class="label">学期名称：</span>
            <span class="value">{{ currentSemester.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">开始日期：</span>
            <span class="value">{{ currentSemester.startDate | dateFormat }}</span>
          </div>
          <div class="info-item">
            <span class="label">结束日期：</span>
            <span class="value">{{ currentSemester.endDate | dateFormat }}</span>
          </div>
        </div>

        <div v-else class="empty-state">
          <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/aphqeh7uhohpquloj/empty-state/empty-schedule.svg" alt="暂无学期" class="empty-img">
          <p class="empty-tip">当前没有学期信息</p>
          <p class="empty-desc">点击下方按钮创建新的学期</p>
        </div>
      </div>

      <template #footer>
        <div class="button-group">
          <el-button 
            type="primary" 
            @click="openCreateDialog" 
            v-if="!currentSemester"
            class="create-btn"
          >
            新建学期
            <el-icon class="ml-2">
              <Plus />
            </el-icon>
          </el-button>
        </div>
      </template>
    </el-card>

    <!-- 学期编辑对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="学期编辑"
      width="480px"
      :before-close="handleClose"
      custom-class="semester-dialog"
    >
      <el-form 
        :model="semesterForm" 
        label-width="100px" 
        class="edit-form"
        ref="formRef"
      >
        <el-form-item label="学期名称" prop="name">
          <el-input 
            v-model.trim="semesterForm.name"
            placeholder="请输入学期名称（如：2025-2026学年第一学期）"
          />
        </el-form-item>

        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker
            v-model="semesterForm.startDate"
            type="date"
            placeholder="选择开始日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :disabled-date="disabledStartDate"
          />
        </el-form-item>

        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker
            v-model="semesterForm.endDate"
            type="date"
            placeholder="选择结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :disabled-date="disabledEndDate"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button 
            type="primary" 
            @click="handleSave"
            :loading="isLoading"
          >
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit, Plus } from '@element-plus/icons-vue'

export default defineComponent({
  components: { Edit, Plus },
  setup() {
    // 状态管理
    const currentSemester = ref(null) // 模拟初始无学期
    const dialogVisible = ref(false)
    const isLoading = ref(false)
    const formRef = ref(null)

    // 表单数据
    const semesterForm = ref({
      name: '',
      startDate: null,
      endDate: null
    })

    // 日期禁用规则
    const disabledStartDate = (time) => {
      return time.getTime() < Date.now() - 86400000
    }

    const disabledEndDate = (time) => {
      if (!semesterForm.value.startDate) return false
      return time.getTime() < new Date(semesterForm.value.startDate).getTime()
    }

    // 方法
    const openCreateDialog = () => {
      semesterForm.value = { name: '', startDate: null, endDate: null }
      dialogVisible.value = true
    }

    const openEditDialog = () => {
      semesterForm.value = { ...currentSemester.value }
      dialogVisible.value = true
    }

    const handleSave = async () => {
      try {
        isLoading.value = true
        await formRef.value.validate()
        
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 800))
        
        currentSemester.value = { ...semesterForm.value }
        ElMessage.success('保存成功')
        dialogVisible.value = false
      } catch (error) {
        ElMessage.error('请检查输入内容')
      } finally {
        isLoading.value = false
      }
    }

    const handleClose = () => {
      ElMessageBox.confirm('是否放弃当前修改？', '提示', {
        type: 'warning'
      }).then(() => {
        dialogVisible.value = false
        semesterForm.value = currentSemester ? { ...currentSemester.value } : { name: '', startDate: null, endDate: null }
      })
    }

    // 计算属性
    const dateFormat = computed({
      get: () => (date) => {
        if (!date) return '未设置'
        const d = new Date(date)
        return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
      }
    })

    return {
      currentSemester,
      dialogVisible,
      isLoading,
      formRef,
      semesterForm,
      openCreateDialog,
      openEditDialog,
      handleSave,
      handleClose,
      disabledStartDate,
      disabledEndDate,
      dateFormat
    }
  }
})
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
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #ebedf0;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.actions .action-icon {
  font-size: 1.125rem;
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

.semester-info {
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  row-gap: 12px;
}

.info-item {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  min-width: 80px;
  font-weight: 500;
  color: #666;
}

.value {
  flex: 1;
  color: #333;
  font-size: 0.975rem;
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

.button-group {
  padding: 24px;
  border-top: 1px solid #ebedf0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.create-btn {
  padding: 10px 24px;
  font-weight: 500;
  background: #409eff;
  color: white;
  border-radius: 6px;
  transition: transform 0.2s;
}

.create-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.semester-dialog .el-dialog__header {
  background: #409eff;
  color: white;
  padding: 16px 24px;
  border-radius: 16px 16px 0 0;
}

.semester-dialog .el-dialog__body {
  padding: 24px;
}

.edit-form {
  gap: 16px;
}

.el-form-item {
  margin-bottom: 0;
}

.el-date-picker {
  width: 100%;
}

.dialog-footer {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .semester-management {
    padding: 16px;
  }

  .main-card {
    border-radius: 12px;
  }

  .card-header {
    padding: 16px;
  }

  .semester-info {
    grid-template-columns: 1fr;
  }

  .info-item {
    padding: 12px;
  }

  .empty-img {
    width: 160px;
  }
}
</style>