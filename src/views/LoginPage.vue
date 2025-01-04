<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Lock, User, Message, ChatRound } from '@element-plus/icons-vue'

const router = useRouter()

const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

const loginType = ref('email') // email | phone
const isLoading = ref(false)
const formRef = ref()

const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}

const handleLogin = async (formEl: any) => {
  router.push('/main')
  if (!formEl) return
  
  await formEl.validate((valid: boolean) => {
    if (valid) {
      isLoading.value = true
      // 模拟登录请求
      setTimeout(() => {
        isLoading.value = false
        ElMessage.success('登录成功')
        router.push('/dashboard')
      }, 1500)
    }
  })
}

const handleSocialLogin = (platform: string) => {
  ElMessage.info(`使用${platform}登录`)
}

const switchLoginType = () => {
  loginType.value = loginType.value === 'email' ? 'phone' : 'email'
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-header">
        <div class="logo-container">
          <img src="/gift.jpg" alt="Logo" class="logo">
          <span class="app-name">礼尚往来</span>
        </div>
        <h1>欢迎回来</h1>
        <p class="subtitle">登录您的账号以继续使用</p>
      </div>

      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
      >
        <div class="login-type-switch">
          <span 
            :class="{ active: loginType === 'email' }"
            @click="loginType = 'email'"
          >
            邮箱登录
          </span>
          <span 
            :class="{ active: loginType === 'phone' }"
            @click="loginType = 'phone'"
          >
            手机号登录
          </span>
        </div>

        <el-form-item prop="email" v-if="loginType === 'email'">
          <el-input
            v-model="loginForm.email"
            placeholder="请输入邮箱"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item prop="phone" v-else>
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            :prefix-icon="User"
          >
            <template #prepend>
              <el-select
                v-model="loginForm.countryCode"
                placeholder="+86"
                style="width: 100px"
              >
                <el-option label="+86" value="+86" />
                <el-option label="+852" value="+852" />
                <el-option label="+853" value="+853" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <div class="form-footer">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <el-link type="primary">忘记密码？</el-link>
        </div>

        <el-button
          type="primary"
          :loading="isLoading"
          class="login-button"
          @click="handleLogin(formRef)"
        >
          登录
        </el-button>

        <div class="divider">
          <span>或使用以下方式登录</span>
        </div>

        <div class="social-login">
          <button class="social-button wechat" @click="handleSocialLogin('微信')">
            <el-icon><ChatRound /></el-icon>
          </button>
        </div>

        <div class="register-hint">
          还没有账号？
          <el-link type="primary" @click="router.push('/register')">立即注册</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%);
    pointer-events: none;
  }
}

.login-content {
  background: white;
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.logo {
  width: 64px;
  height: 64px;
}

.app-name {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.5px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 16px;
}

.login-type-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  gap: 24px;
}

.login-type-switch span {
  padding: 8px 16px;
  cursor: pointer;
  color: #666;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.login-type-switch span.active {
  background: #f0f7ff;
  color: #409eff;
  font-weight: 500;
}

.login-form {
  :deep(.el-input__wrapper) {
    border-radius: 12px;
    padding: 8px 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    background-color: #f8f9fa;
    border: 1px solid #ebeef5;
    transition: all 0.3s ease;

    &:hover {
      background-color: #fff;
      border-color: #c0c4cc;
    }

    &.is-focus {
      background-color: #fff;
      border-color: #409eff;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
    }
  }

  :deep(.el-input__inner) {
    height: 38px;
    font-size: 14px;
  }

  :deep(.el-select .el-input__wrapper) {
    box-shadow: none;
    background-color: transparent;
    border: none;
  }

  :deep(.el-form-item) {
    margin-bottom: 20px;
  }
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 24px;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
  }
}

.divider {
  position: relative;
  text-align: center;
  margin: 24px 0;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(50% - 80px);
    height: 1px;
    background: #e4e4e4;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
  
  span {
    background: white;
    padding: 0 16px;
    color: #999;
    font-size: 14px;
  }
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.social-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &.wechat {
    background: #07c160;
  }
  
  &.alipay {
    background: #1677ff;
  }

  .el-icon {
    font-size: 24px;
  }
}

.register-hint {
  text-align: center;
  color: #666;
  font-size: 14px;
}

@media (max-width: 480px) {
  .login-content {
    padding: 24px;
    border-radius: 16px;
  }
  
  .login-header h1 {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
  
  .app-name {
    font-size: 20px;
  }
}
</style> 