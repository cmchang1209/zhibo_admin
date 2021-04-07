<template>
  <div class="equipment-list">
    <el-table :data="tableData" :span-method="objectSpanMethod" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
      <el-table-column prop="no" label="NO" width="180">
      </el-table-column>
      <el-table-column prop="name" label="NAME">
      </el-table-column>
      <el-table-column prop="mac" label="MAC">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template v-if="scope.row.parent" slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text">
            Edit Name
          </el-button>
          <el-button @click.native.prevent="fcnr(scope.$index, scope.row)" type="text" class="text-danger">
            FCNR
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
      loading: false
    }
  },
  sockets: {
    connect() {},
    EquipmentData(val) {
      val.map((item) => {
        item.children = JSON.parse(item.children)
        item.parent = true
        item.children.map((citem, cindex) => {
          citem.id = (item.id + cindex.toString()) * 1 + 1
          citem.mac = '-'
          if (!citem.no) {
            citem.no = 'Unused'
            citem.name = '-'
          }
        })
      })
      this.tableData = val
      //console.log(val)
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
    deleteRow(index, rows) {
      console.log(rows)
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
        this.$socket.client.emit('fcnr', this.form)
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-table [class*=el-table__row--level] .el-table__expand-icon {
  display: inline-block;
  width: 20px;
  line-height: 20px;
  height: 20px;
  text-align: center;
  margin-right: 3px;
}

.text-danger span {
  color: #f56c6c !important;
}

</style>
/* eslint-enable */
