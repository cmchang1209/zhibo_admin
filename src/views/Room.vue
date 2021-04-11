<template>
  <div class="room">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Room</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="end" style="margin-bottom: 15px">
      <el-col :span="6" style="text-align: right;">
        <el-button type="success" icon="el-icon-plus" circle @click="dialogAddRoomVisible = true"></el-button>
      </el-col>
    </el-row>
    <RoomList />
    <el-dialog title="Add New Room" :visible.sync="dialogAddRoomVisible" @closed="cancel">
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
        <el-button type="primary" @click="addRoom" :loading="loading">Add</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import RoomList from '@/components/RoomList.vue'
export default {
  components: {
    RoomList
  },
  sockets: {
    echoAddRoom(val) {
      if (val.insertId) {
        this.$message({
          message: 'room added successfully',
          type: 'success'
        })
      }
      this.cancel()
    }
  },
  data() {
    return {
      dialogAddRoomVisible: false,
      form: {
        name: '',
        style: {
          id: 4,
          name: 'Four divisions'
        }
      },
      options: [{
        id: 4,
        name: 'Four divisions'
      }],
      loading: false
    }
  },
  computed: {},
  created() {},
  methods: {
    cancel() {
      this.loading = false
      this.form.name = ''
      this.dialogAddRoomVisible = false
    },
    addRoom() {
      if (this.form.name.trim() === '') return
      this.loading = true
      this.$socket.client.emit('addRoom', { name: this.form.name, type: this.form.style.id })
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
