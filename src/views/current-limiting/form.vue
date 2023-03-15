<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="50vw"
    :close-on-click-modal="false"
    :before-close="closeFormModal"
  >
    <el-form ref="refForm" label-width="320px" :inline="false" :model="subForm" :rules="formRules" class="pr-5">
      <el-form-item label="限流资源名称：" prop="resource" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="subForm.resource" class="widthPx-150" placeholder="限流资源名称" />
      </el-form-item>
      <el-form-item label="限流地址，多个逗号分隔：" prop="uri" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="subForm.uri" class="widthPx-150" placeholder="限流地址，多个逗号分隔" />
      </el-form-item>
      <el-form-item label="限流地址策略：" prop="urlStrategy" :rules="formRules.isNotNull" label-position="left">
        <el-radio-group v-model="subForm.urlStrategy">
          <el-radio label="1">前缀</el-radio>
          <el-radio label="0">精确</el-radio>
          <el-radio label="2">正则</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="限流大小：" prop="count" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="subForm.count" class="widthPx-150" type="number" placeholder="限流大小" />
      </el-form-item>
      <el-form-item label="限流模式：" prop="grade" :rules="formRules.isNotNull" label-position="left">
        <el-radio-group v-model="subForm.grade">
          <el-radio label="0">线程数</el-radio>
          <el-radio label="1">每秒并发数</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="额外允许的请求数：" prop="burst" label-position="left">
        <el-input v-model="subForm.burst" class="widthPx-150" type="number" placeholder="额外允许的请求数" />
      </el-form-item>
      <el-form-item label="流量控制模式：" prop="controlBehavior" :rules="formRules.isNotNull" label-position="left">
        <el-radio-group v-model="subForm.controlBehavior">
          <el-radio label="0">快速失败</el-radio>
          <el-radio label="1">均匀排队</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最长排队时长(毫秒,均匀排队模式下生效)：" prop="maxQueueingTimeoutMs" label-position="left">
        <el-input v-model="subForm.maxQueueingTimeoutMs" class="widthPx-150" type="number" placeholder="最长排队时长" />
      </el-form-item>
      <el-form-item label="参数提取策略：" prop="paramParseStrategy" label-position="left">
        <el-radio-group v-model="subForm.paramParseStrategy">
          <el-radio label="0">客户端ip</el-radio>
          <el-radio label="1">主机</el-radio>
          <el-radio label="2">请求头</el-radio>
          <el-radio label="3">地址参数</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="参数名称(header或者url_param模式使用)：" prop="paramFieldName" label-position="left">
        <el-input v-model="subForm.paramFieldName" class="widthPx-150" placeholder="参数名称" />
      </el-form-item>
      <el-form-item label="参数限流-匹配值(header或者url_param模式使用)：" prop="pattern" label-position="left">
        <el-input v-model="subForm.pattern" class="widthPx-150"  placeholder="参数限流-匹配值" />
      </el-form-item>
      <el-form-item label="参数限流-匹配策略(header或者url_param模式使用)：" prop="matchStrategy" label-position="left">
        <el-radio-group v-model="subForm.matchStrategy">
          <el-radio label="0">精确</el-radio>
          <el-radio label="3">包含</el-radio>
          <el-radio label="2">正则</el-radio>
        </el-radio-group>
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
  resource:'',
  uri:'',
  urlStrategy:'1',
  count:'',
  grade:'1',
  burst:'',
  controlBehavior:'0',
  maxQueueingTimeoutMs:'',
  paramParseStrategy:'',
  paramFieldName:'',
  pattern:'',
  matchStrategy:''
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
    url: '/flow/role/add',
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
    dialogTitle.value = '添加【限流】'
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
