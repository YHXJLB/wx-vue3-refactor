<!-- src/App.vue -->
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';
import { usePlayerStore } from '@/stores/player';
import { useSiteStore } from '@/stores/site';
import { useChatStore } from '@/stores/chat';
import { getTokenByRole } from '@/utils/auth'; // 假设这个工具函数已迁移

const appStore = useAppStore();
const userStore = useUserStore();
const playerStore = usePlayerStore();
const siteStore = useSiteStore();
const chatStore = useChatStore();

// 模拟 uni-app 的 onLaunch
onMounted(async () => {
  console.log('App Launched');
  await siteStore.fetchSiteConfig(); // 获取站点配置
  appStore.restoreRole(); // 恢复用户角色

  if (userStore.token) { // 如果用户已登录
    await userStore.fetchProfile(); // 获取用户资料
    if (appStore.role === 'player') { // 如果角色是服务提供者
      await playerStore.fetchProfile(); // 获取服务者资料
    }
  }

  // 检查是否需要连接聊天
  if (shouldConnectChat()) {
    // 延迟连接，模拟原逻辑
    setTimeout(() => {
      chatStore.connect();
    }, 300);
  }
});

// 模拟 uni-app 的 onShow
const handleFocus = async () => {
  console.log('App Showed/Focused');
  if (shouldConnectChat()) {
    if (!chatStore.connected) {
      chatStore.connect();
    }
    await chatStore.fetchMessageUnreadCount(); // 获取未读消息数
  }
};

onMounted(() => {
  window.addEventListener('focus', handleFocus);
});
onUnmounted(() => {
  window.removeEventListener('focus', handleFocus);
});

// 辅助函数：判断是否应连接聊天
function shouldConnectChat() {
  // 这里假设角色存储在 localStorage 或 Pinia 中
  const role = localStorage.getItem('app_role') || 'user'; 
  const token = getTokenByRole(role);
  return !!token;
}

// 模拟 uni-app 的 on onHide (这里用 visibilitychange 代替)
// const handleBlur = () => { ... };
// window.addEventListener('blur', handleBlur); // 或者使用 visibilitychange
</script>

<template>
  <div id="app">
    <!-- 你的顶级路由视图或其他通用 UI -->
    <RouterView />
  </div>
</template>

<style>
/* 全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* 原小程序全局背景色 */
  background-color: #f1f5f9; 
  min-height: 100vh; /* 确保占满全屏 */
}
</style>
