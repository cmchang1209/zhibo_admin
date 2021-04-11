<template>
  <div class="room-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column label="No" prop="no">
      </el-table-column>
      <el-table-column label="Name" prop="name">
      </el-table-column>
      <el-table-column label="Type">
        <template slot-scope="scope">
          {{ getTypeName(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="Operating" fixed="right" :width="320">
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="handleEdit(scope.$index, scope.row)">Modify</el-button>
          <el-button type="text" @click.native.prevent="handleViewEdit(scope.$index, scope.row)" class="text-warning">View Edit</el-button>
          <el-button type="text" @click.native.prevent="handleDelete(scope.$index, scope.row)" class="text-danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="form.title" :visible.sync="dialogRoomVisible">
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
        <el-button @click="cancel">Cancel</el-button>
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
        no: '',
        style: {
          id: 4,
          name: 'Four divisions'
        }
      },
      loading: false,
      options: [{
        id: 4,
        name: 'Four divisions'
      }],
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
    echoUpdateRoom(val) {
      if (val.changedRows) {
      	this.$socket.client.emit('getRoomList')
        this.$message({
          message: 'room data update successfully',
          type: 'success'
        })
      }
      this.cancel()
    }
  },
  created() {
    this.$socket.client.emit('getRoomList')
  },
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.form.title = 'Modify Room ' + row.no + ' data'
      this.form.no = row.no
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
      this.$socket.client.emit('updateRoom', { id: this.form.id, name: this.form.name, type: this.form.style.id, no: this.form.no })
    },
    cancel() {
      this.loading = false
      this.form.title = ''
      this.form.name = ''
      this.form.no = ''
      this.form.index = ''
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
