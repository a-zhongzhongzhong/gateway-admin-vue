<template>
  <div class="scroll-y">
    <el-button @click="toggleHtmlClass('dark')">切换主题色(dark-theme)</el-button>
    <el-button @click="toggleHtmlClass('lighting-theme')">切换主题色(lighting-theme)</el-button>
    <el-button @click="toggleHtmlClass('base-theme')">切换主题色(base-theme)(default)</el-button>                
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'

const count = ref(0)
const input = ref('element-plus')

const curDate = ref('')

const toast = () => {
  ElMessage.success('Hello')
}
import { toggleHtmlClass } from '@/theme/utils'

import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const username = computed(() => {
  return userStore.username
})

const showObj = ref(GLOBAL_VAR)
// eslint-disable-next-line no-undef
const showObjString = ref(GLOBAL_STRING)
</script>
