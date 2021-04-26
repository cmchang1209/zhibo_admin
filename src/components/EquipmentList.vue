<template>
  <div class="equipment-list">
    <el-table :data="tableData" :span-method="objectSpanMethod" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
      <el-table-column prop="no" label="NO" width="180">
      </el-table-column>
      <el-table-column prop="name" label="NAME">
      </el-table-column>
      <el-table-column prop="mac" label="MAC">
      </el-table-column>
      <el-table-column label="Connection status">
        <template slot-scope="scope">
          <span v-if="scope.row.parent">{{ scope.row.status? 'Connect' : 'Disconnected' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operating" width="280">
        <template slot-scope="scope">
          <el-button v-if="scope.row.parent" @click.native.prevent="rename(scope.$index, scope.row)" type="text">
            Rename
          </el-button>
          <el-button v-if="scope.row.parent && scope.row.status" @click.native.prevent="fcnr(scope.$index, scope.row)" type="text" class="text-danger">
            Engineering mode
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改名稱 -->
    <el-dialog :title="renameForm.title" :visible.sync="dialogFormVisible" :before-close="renameCancel">
      <el-form :model="renameForm" label-width="60px">
        <el-form-item label="Name">
          <el-input v-model="renameForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">Cancel</el-button>
        <el-button type="primary" @click="updateName" :loading="loading">Update</el-button>
      </div>
    </el-dialog>
    <!-- 反向代理 port -->
    <el-dialog title="Input FCNR Port" :visible.sync="dialogFCNRVisible" @closed="cancel">
      <el-form :model="form" label-width="60px">
        <el-form-item label="Port">
          <el-input v-model="form.port" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="openFcnr" :loading="loading">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'EquipmentList',
  props: {},
  data() {
    return {
      tableData: [],
      dialogFCNRVisible: false,
      form: {
        id: '',
        port: ''
      },
      dialogFormVisible: false,
      renameForm: {
        title: '',
        name: '',
        id: ''
      },
      loading: false
    }
  },
  sockets: {
    connect() {},
    EquipmentData(val) {
      this.tableData = val
    },
    updateEquipmentNameEcho(val) {
      if(val.data.changedRows) {
        this.tableData.map(iteam => {
          if(iteam.id === val.id) {
            iteam.name = val.name
          }
        })
        this.renameCancel()
        this.$message({
          message: 'Successfully rename',
          type: 'success'
        })
      } else {
        this.renameCancel()
        this.$message.error('fail to rename')
      }
    },
    fcnrEcho(val) {
      this.cancel()
      if (val) {
        this.$message({
          message: '反向代理開啟成功',
          type: 'success'
        })
      } else {
        this.$message.error('反向代理開啟失敗')
      }
    }
  },
  created() {
    this.$socket.client.emit('getEquipmentList')
  },
  methods: {
    rename(index, rows) {
      this.renameForm.title = 'Modify NO :: ' + rows.no + ' Name'
      this.renameForm.name = rows.name
      this.renameForm.id = rows.id
      this.dialogFormVisible = true
    },
    updateName() {
      if (this.renameForm.name !== '') {
        this.loading = true
        this.$socket.client.emit('updateEquipmentName', this.renameForm)
      }
    },
    renameCancel() {
      this.loading = false
      this.renameForm.id = ''
      this.renameForm.title = ''
      this.renameForm.name = ''
      this.dialogFormVisible = false
    },
    fcnr(index, rows) {
      this.dialogFCNRVisible = true
      this.form.id = rows.id
    },
    cancel() {
      this.loading = false
      this.form.id = ''
      this.form.port = ''
      this.dialogFCNRVisible = false
    },
    openFcnr() {
      if (this.form.port !== '' && !isNaN(this.form.port * 1)) {
        this.loading = true
        this.$socket.client.emit('fcnr', this.form)
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
/* eslint-enable */
