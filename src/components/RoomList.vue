<template>
  <div class="room-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <!-- <el-table-column label="No" prop="no">
      </el-table-column> -->
      <el-table-column label="Name" prop="name">
      </el-table-column>
      <el-table-column label="Type">
        <template slot-scope="scope">
          {{ getTypeName(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="Operating" fixed="right" :width="320">
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="handleEdit(scope.$index, scope.row)">Update</el-button>
          <el-button type="text" @click.native.prevent="handleViewEdit(scope.$index, scope.row)" class="text-warning">Edit</el-button>
          <el-button type="text" @click.native.prevent="handleDelete(scope.$index, scope.row)" class="text-danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改資料 -->
    <el-dialog :title="form.title" :visible.sync="dialogRoomVisible" :before-close="updateCancel">
      <el-form :model="form" label-width="120px">
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Display Style">
          <el-select v-model="form.style" :value-key="id" placeholder="Please select a display style">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoomVisible=false">Cancel</el-button>
        <el-button type="primary" @click="update" :loading="loading">Update</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Prompt" :visible.sync="dialogDelRoomVisible" :before-close="handleClose" width="40%">
      <div>{{ del.msg }}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delCancel">Cancel</el-button>
        <el-button type="primary" @click="delConfirm" :loading="del.loading">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'RoomList',
  props: {},
  data() {
    return {
      tableData: [],
      dialogRoomVisible: false,
      dialogDelRoomVisible: false,
      form: {
        title: '',
        name: '',
        id: '',
        style: 4
      },
      loading: false,
      options: [{
          id: 4,
          name: 'Four divisions'
        },
        {
          id: 5,
          name: 'Five divisions'
        }
      ],
      del: {
        no: '',
        index: '',
        msg: '',
        loading: false
      }
    }
  },
  sockets: {
    roomList(val) {
      this.tableData = val
    },
    updateRoomEcho(val) {
      if(val.data.changedRows) {
        this.tableData.map(iteam => {
          if(iteam.id === val.id) {
            iteam.name = val.name
            iteam.type = val.style
          }
        })
        this.updateCancel()
        this.$message({
          message: 'room data update successfully',
          type: 'success'
        })
      } else {
        this.updateCancel()
        this.$message.error('fail to room data update')
      }
    }
  },
  created() {
    this.$socket.client.emit('getRoomList')
  },
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.form.title = 'Modify Room :: ' + row.no + ' data'
      this.form.name = row.name
      this.form.id = row.id
      this.dialogRoomVisible = true
    },
    handleDelete(index, row) {
      this.del.inedx = index
      this.del.no = row.no
      this.del.msg = 'Are you sure you want to delete Room ' + row.no + ' (' + row.name + ')'
      this.dialogDelRoomVisible = true
    },
    handleViewEdit(index, row) {
      this.$router.push({ name: 'ScreenEdit', query: { no: row.no } })
    },
    update() {
      if (this.form.name.trim() === '') return
      this.loading = true
      this.$socket.client.emit('updateRoom', this.form)
    },
    updateCancel() {
      this.loading = false
      this.form.title = ''
      this.form.name = ''
      this.form.index = ''
      this.form.style = 4
      this.dialogRoomVisible = false
    },
    getTypeName(row) {
      var data = this.options.filter((item) => { return item.id === (1 * row.type) })
      return data ? data[0].name : ''
    },
    delCancel() {
      this.del.loading = false
      this.del.index = ''
      this.del.no = ''
      this.del.msg = ''
      this.dialogDelRoomVisible = false
    },
    delConfirm() {
      this.$socket.client.emit('delRoom', { no: this.del.no })
    }
  }
}
/* eslint-enable */

</script>
<style scoped lang="scss">
.el-select {
  width: 100%;
}

</style>
