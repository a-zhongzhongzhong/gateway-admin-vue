<template>
  <div class="scroll-y">
    <h3 class="mb-2">props operate demo of settings.js</h3>
    <div class="rowSS">
      <div class="mb-1">
        相关的页面布局
        <div class="mt-2">
          是否显示侧边栏logo：
          <el-switch v-model="appStore.settings.sidebarLogo" />
        </div>
        <div class="mt-3">
          是否显示导航栏标题
          <el-switch v-model="appStore.settings.showNavbarTitle" />
        </div>
        <div class="mt-3">
          是否显示右上角菜单：
          <el-switch v-model="appStore.settings.ShowDropDown" />
        </div>
        <div class="mt-3">
          是否显示面包屑：
          <el-switch v-model="appStore.settings.showHamburger" />
        </div>
        <div class="mt-3">
          是否显示左菜单：
          <el-switch v-model="appStore.settings.showLeftMenu" />
        </div>
        <div class="mt-3">
          是否显示页面标题：
          <el-switch v-model="appStore.settings.showTagsView" />
        </div>
        <div class="mt-3">
          是否显示顶部导航条：
          <el-switch v-model="appStore.settings.showTopNavbar" />
        </div>
      </div>

      <div class="mb-1 ml-6">
        相关的页面动画        
        <div class="mt-3">
          是否需要进度条：
          <el-switch v-model="appStore.settings.isNeedNprogress" />
        </div>
      </div>
    </div>    
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'

const settings = computed(() => {
  return appStore.settings || {}
})

const appStore = useAppStore()

const source = ref(false)
const sourceFun = () => {
  source.value = !source.value
}
const handle = () => {
  new Promise((resolve, reject) => {
    reject('reject promise')
  }).then((res) => {
    console.log('ok')
  })
}

const flag = ref(null)

const consoleErrorFun = () => {
  console.error('console.error')
}

const normalError = () => {
  throw new Error(' throw new Error("")\n')
}
const { proxy } = getCurrentInstance()
const updateReq = () => {
  return proxy
    .$axiosReq({
      // baseURL: 'https://github.jzfai.top/micro-service-test',
      url: '/integration-front/brand/updateBy',
      data: { id: 'fai' },
      method: 'put',
      isParams: true,
      bfLoading: true
    })
    .then(() => {})
  // .catch((err) => {
  //   console.log('接口catch', err)
  // })
}
</script>

<style scoped lang="scss"></style>
