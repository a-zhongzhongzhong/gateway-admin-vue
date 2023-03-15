<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="50vw"
    :close-on-click-modal="false"
    :before-close="closeFormModal"
  >
    <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm" :rules="formRules" class="pr-5">
      <el-form-item label="名称" prop="name" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="subForm.name" class="widthPx-150" placeholder="名称" />
      </el-form-item>
      <el-form-item label="接口地址" prop="uri" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="subForm.uri" class="widthPx-150" placeholder="接口地址" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeFormModal">取 消</el-button>
        <el-button type="primary" @click="confirmBtnClick">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
/*1.初始化引入和实例化*/
const emit = defineEmits(['selectPageReq', 'hideComp'])
/*2.modal新增和修改*/
//新增
let subForm = reactive({
  id: '',
  uri: '',
  name:''
})
const refForm = ref(null)
let confirmBtnClick = () => {
  refForm.value.validate((valid) => {
    if (valid) {
      insertReq()
      /* if (subForm.id) {
        updateReq()
      } else {
        
      } */
    } else {
      return false
    }
  })
}
const { formRules, elMessage } = useElement()

const insertReq = () => {
  delete subForm.id
  axiosReq({
    url: '/routes/filter/add',
    data: subForm,
    method: 'post', //--c
    bfLoading: true
  }).then(() => {
    elMessage('保存成功')
    emit('selectPageReq')
    emit('hideComp')
  })
}
//修改
const reshowData = (row) => {
  Object.keys(row).forEach((fItem) => {
    Object.keys(subForm).forEach((sItem) => {
      if (fItem === sItem) {
        subForm[sItem] = row[sItem]
      }
    })
  })
}
let updateReq = () => {
  return axiosReq({
    url: '/integration-front/brand/updateById',
    data: subForm,
    method: 'put',
    bfLoading: true
  }).then(() => {
    elMessage('更新成功')
    emit('selectPageReq')
    emit('hideComp')
  })
}

/*3.弹框相关*/
//显示弹框
const { dialogTitle, dialogVisible, chooseFileName } = useCommon()
let showModal = (isEdit, detailData) => {
  if (isEdit) {
    dialogTitle.value = `编辑【${detailData.name}】`
    dialogVisible.value = true
    reshowData(detailData)
  } else {
    dialogTitle.value = '添加【brand】'
    dialogVisible.value = true
  }
}
//关闭弹框
let closeFormModal = () => {
  emit('hideComp')
}

/*4.上传文件相关*/
const refSettingFile = ref(null)
const goUploadFile = () => {
  refSettingFile.value.click()
}

const fileUploadSave = () => {
  const formData = new FormData()
  formData.append('file', refSettingFile.value.files[0])
  axiosReq({
    url: '/basis-func/upload/file',
    timeout: 30000,
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true
  })
    .then((resData) => {
      let { path } = resData.data
      // 存储文件名称
      const filename = refSettingFile.value.value
      chooseFileName.value = filename.slice(filename.lastIndexOf('\\') + 1)
      subForm.image = `${import.meta.env.VITE_APP_IMAGE_URL}/${path}`
      console.log('subForm', subForm)
      refSettingFile.value = ''
    })
    .catch(() => {
      chooseFileName.value = ''
      subForm.image = ''
      refSettingFile.value = ''
    })
}

//导出给refs使用
defineExpose({
  showModal
})

//导出属性到页面中使用
// let {levelList} = toRefs(state);
</script>

<style scoped lang="scss"></style>
