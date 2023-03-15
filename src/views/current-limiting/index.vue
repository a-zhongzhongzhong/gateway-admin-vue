<template>
  <div class="scroll-y">
    <!--操作-->
    <div class="mr-3 rowSS">
      <el-button type="primary" @click="addBtnClick">
        <el-icon style="vertical-align: middle">
          <FolderAdd />
        </el-icon>
        <span style="vertical-align: middle">增加</span>
      </el-button>
 <!--      <el-button type="primary" @click="multiDelBtnClick">
        <el-icon style="vertical-align: middle">
          <Delete />
        </el-icon>
        <span style="vertical-align: middle">删除</span>
      </el-button> -->
      <!--条件搜索-->
      <el-form ref="refsearchForm" :inline="true" class="demo-searchForm ml-2">
        <el-form-item label-width="0px" label="" prop="username" label-position="left">
          <!--  --c -->
          <el-input v-model="searchForm.name" class="widthPx-150" placeholder="开发者名称" />
        </el-form-item>
        <el-form-item label-width="0px" label="" prop="createTime" label-position="left">
          <el-date-picker
            v-model="startEndArr"
            type="datetimerange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
            class="widthPx-250"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateTimePacking"
          />
        </el-form-item>
      </el-form>
      <!--查询按钮-->
      <el-button type="primary" @click="searchBtnClick">查询</el-button>
    </div>
    <!--表格和分页-->
    <el-table
      id="resetElementDialog"
      ref="refuserTable"
      :height="`calc(100vh - ${settings.delWindowHeight})`"
      border
      :data="usertableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"/>
      <el-table-column align="center" prop="resource" label="限流资源名称" />     
      <el-table-column align="center" prop="uri" label="限流地址"/>      
      <el-table-column align="center" prop="urlStrategy" label="限流地址策略">      
        <template #default="scope">
          <p> {{scope.row.urlStrategy == 0 ? '精确' : scope.row.urlStrategy == 1 ? '前缀':'正则'}} </p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="count" label="限流模式">  
        <template #default="scope">
          <p> {{scope.row.grade == 0 ? '线程数' : '每秒并发数'}} </p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="count" label="限流大小"/>      
      <el-table-column align="center" prop="burst" label="额外允许的请求数"/>
      <el-table-column align="center" prop="controlBehavior" label="流量控制模式">
        <template #default="scope">
          <p> {{scope.row.controlBehavior == 0 ? '快速失败' : '均匀排队'}} </p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="maxQueueingTimeoutMs" label="最长排队时长"/>
      <!--点击操作-->
      <el-table-column fixed="right" align="center" label="操作" width="180">
        <template #default="{ row }">
          <!-- <el-button text size="small" @click="tableEditClick(row)">编辑</el-button> -->
          <el-button text size="small" @click="tableDetailClick(row)">详情</el-button>
          <el-button text size="small" @click="tableDelClick(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block columnCC mt-2">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--详情-->
    <el-dialog v-model="detailDialog" :title="dialogTitle" width="500px" :close-on-click-modal="false">
      <div class="detail-container rowBC">
        <div class="detail-container-item">限流资源名称：【{{ detailData.resource }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">限流地址：【{{ detailData.uri }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">限流地址策略：【{{ detailData.urlStrategy == 0 ? '精确' : detailData.urlStrategy == 1 ? '前缀': detailData.urlStrategy == 2 ? '正则' : ''}}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">限流大小：【{{ detailData.count }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">限流模式：【{{ detailData.grade == 0 ? '线程数' : '每秒并发数' }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">额外允许的请求数：【{{ detailData.burst }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">流量控制模式：【{{ detailData.controlBehavior == 0 ? '快速失败' : '均匀排队' }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">最长排队时长(毫秒,均匀排队模式下生效)：【{{ detailData.maxQueueingTimeoutMs }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">参数提取策略：【{{ detailData.paramParseStrategy == 0 ? '客户端ip' : 
        detailData.paramParseStrategy == 1 ? '主机' : detailData.paramParseStrategy == 2 ? '请求头' :  detailData.paramParseStrategy == 4 ? '地址参数' : ''}}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">参数名称(header或者url_param模式使用)：【{{ detailData.paramFieldName }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">参数限流-匹配值(header或者url_param模式使用)：【{{ detailData.pattern }}】</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">参数限流-匹配策略(header或者url_param模式使用)：【{{ detailData.matchStrategy == 0 ? '精确' : detailData.matchStrategy == 2 ? '正则' :  
        detailData.matchStrategy == 3 ?'包含' : ''}}】</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailDialog = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <CRUDForm v-if="showFrom" ref="refCRUDForm" @hideComp="hideComp" @selectPageReq="selectPageReq" />
  </div>
</template>
<script>
export default {
  name: 'Brand'
}
</script>
<script setup>
import { Delete, FolderAdd } from '@element-plus/icons-vue'
/*1.初始化引入和实例化*/
import settings from '@/settings'
import CRUDForm from './form.vue'
import tablePageHook from '@/hooks/useTablePage'
import dateUtils from '@/utils/dateUtils.js'
onActivated(() => {
  console.log('onActivated')
})
onDeactivated(() => {
  console.log('onDeactivated')
})
/*2.表格操作和查询*/
let multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
let usertableData = ref([])
let searchForm = reactive({
  id: '',
  name: '',
  image: '',
  letter: '',
  seq: ''
})
onMounted(() => {
  selectPageReq()
})

let { startEndArr, totalPage } = useCommon()
let selectPageReq = () => {
  const data = Object.assign(searchForm, {
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
  Object.keys(data).forEach((fItem) => {
    if (data[fItem] === '' || data[fItem] === null || data[fItem] === undefined) delete data[fItem]
  })
  let reqConfig = {
    url: '/flow/role/list',
    method: 'get',
    data,
    isParams: true
  }
  axiosReq(reqConfig).then((resData) => {
    usertableData.value = resData.data?.content
    totalPage.value = resData.data?.totalElements  
  })
}

let { pageNum, pageSize, handleCurrentChange, handleSizeChange } = tablePageHook(selectPageReq)
const dateTimePacking = (timeArr) => {
  if (timeArr && timeArr.length === 2) {
    searchForm.startTime = timeArr[0]
    searchForm.endTime = timeArr[1]
  } else {
    searchForm.startTime = ''
    searchForm.endTime = ''
  }
}
const searchBtnClick = () => {
  //此处要重置页数，也是常出的bug
  pageNum.value = 1
  selectPageReq()
}
 //删除相关
let { elMessage, elConfirm } = useElement()
/*
const refuserTable = ref(null)
const multiDelBtnClick = () => {
  let rowDeleteIdArr = []
  let deleteNameTitle = ''
  rowDeleteIdArr = multipleSelection.value.map((mItem) => {
    deleteNameTitle = deleteNameTitle + mItem.name + ','
    return mItem.id
  })
  if (rowDeleteIdArr.length === 0) {
    elMessage('表格选项不能为空', 'warning')
    return
  }
  let stringLength = deleteNameTitle.length - 1
  elConfirm('删除', `您确定要删除【${deleteNameTitle.slice(0, stringLength)}】吗`)
    .then(() => {
      const data = rowDeleteIdArr
      axiosReq({
        url: `/integration-front/brand/deleteBatchIds`,
        data,
        method: 'DELETE',
        bfLoading: true
      }).then((res) => {
        elMessage('删除成功')
        selectPageReq()
      })
    })
    .catch(() => {})
} */
let deleteByIdReq = (id) => {
  return axiosReq({
    url: '/flow/role/del/'+id,    
    isParams: true,
    method: 'delete',
    bfLoading: true
  })
}
let tableDelClick = (row) => {  
  elConfirm('确定', `您确定要删除【${row.id}】吗？`)
    .then(() => {
      deleteByIdReq(row.id).then(() => {
        selectPageReq()
        elMessage(`【${row.id}】删除成功`)
      })
    })
    .catch(() => {})
}
//添加和修改
let showFrom = ref(false)
const refCRUDForm = ref(null)
let addBtnClick = () => {
  showFrom.value = true
  nextTick(() => {
    refCRUDForm.value.showModal()
  })
}
onMounted(() => {
  console.log('import', import.meta.env.VITE_APP_IMAGE_URL)
})
const hideComp = () => {
  showFrom.value = false
}
/* let tableEditClick = (row) => {
  getDetailByIdReq(row.id).then((resData) => {   
    showFrom.value = true
    nextTick(() => {
      refCRUDForm.value.showModal(true, resData.data)
    })
  })
} */
/*3.详情modal*/
let detailData = ref({})
let { dialogTitle, detailDialog } = useElement()
let tableDetailClick = (row) => {  
  console.log(row);
  dialogTitle.value = "详情【"+row.resource+"】"
  getDetailByIdReq(row.id).then((resData) => {    
    detailData.value = resData.data
    detailDialog.value = true
  })
}
let getDetailByIdReq = (id) => {
  return axiosReq({
    url: '/flow/role/detail/'+id,
    //data: { id }, //--c
    isParams: true,
    method: 'get'
  })
}
//时间格式化
const changeFormdate = computed(() => {
  return (time) => {
    if (time == -1) {
      return "永不过期";
    } else {
      let date = new Date(time);
      return dateUtils.formatDate(date, "yyyy-m-d h:i:s");
    }    
  };
});
</script>

<style scoped lang="scss">
/*详情*/
.detail-container {
  flex-wrap: wrap;
}

.detail-container-item {
  min-width: 40%;
  margin-bottom: 20px;
}

.detailDialog-title {
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 16px;
}
</style>
