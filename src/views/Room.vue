<template>
  <div class="room">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Room</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="end" style="margin-bottom: 15px">
      <el-col :span="6" style="text-align: right;">
        <el-button type="success" icon="el-icon-plus" circle @click="dialogFormVisible = true"></el-button>
      </el-col>
    </el-row>
    <RoomList />
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
    modifyXml(val) {
      this.cancel()
    }
  },
  data() {
    return {
      dialogFormVisible: false,
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
      this.dialogFormVisible = false
    },
    addRoom() {
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
