<template>
  <div class="cam">
    <h1>Chanel {{ chanel }}</h1>
    <el-button v-if="status===''" type="success" icon="el-icon-plus" circle title="Add image" @click="dialogImagelVisible = true"></el-button>
    <div v-if="status">
      <h5>{{ chanelName }}</h5>
      <!-- <el-button type="primary" icon="el-icon-thirdplay" circle title="Play image" @click="changeStatus(2)"></el-button>
      <el-button type="info" icon="el-icon-thirdpause" circle title="Pause image" @click="changeStatus(3)"></el-button> -->
      <el-button type="danger" icon="el-icon-delete" circle title="Delete image" @click="deleteChanelImage"></el-button>
    </div>
    <!-- Select image source by chanel -->
    <el-dialog :title="'Please select '+chanel+' image source'" :visible.sync="dialogImagelVisible" @closed="cancel">
      <el-form :model="form" label-width="60px">
        <el-row>
          <el-col :span="12">
            <h3>Equipment list</h3>
            <el-radio-group v-model="form.equipment" @change="changeEquipment">
              <p v-for="item in getEquipmentList" :key="'equipment-'+item.no">
                <el-radio :label="item.id">
                  {{ item.name }} ( {{ item.status? 'Connect' : 'Disconnected' }} )
                </el-radio>
              </p>
            </el-radio-group>
          </el-col>
          <el-col :span="12">
            <h3>Image source</h3>
            <el-radio-group v-model="form.source">
              <p v-for="item in getImageSource" :key="'source-'+item.id">
                <el-radio :label="item.id">
                  {{ item.name }}
                </el-radio>
              </p>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="addChanelImage" :loading="loading">Add</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Cam',
  props: ['roomId', 'chanel', 'piList'],
  data() {
    return {
      status: null,
      chanelName: '',
      dialogImagelVisible: false,
      equipment: [],
      imageSource: [],
      form: {
        roomId: this.roomId,
        chanel: this.chanel,
        equipment: '',
        source: ''
      },
      loading: false
    }
  },
  sockets: {
    chanelData(val) {
      if (val.me.id === this.roomId && val.me.chanel === this.chanel) {
        if (val.data.length !== 0) {
          this.status = val.data[0].status
          this.chanelName = `Equipment : ${val.data[0].name} ; USB : Port-${val.data[0].usb_id}`
        } else {
          this.status = ''
          this.chanelName = ''
        }
      }
    },
    echoAddChanelImage(val) {
      if (val.roomId === this.roomId && val.chanel === this.chanel) {
        if (val.data.insertId) {
          this.$socket.client.emit('getChanelData', { id: this.roomId, chanel: this.chanel })
          this.$message({
            message: `chanel ${val.chanel} image source added successfully`,
            type: 'success'
          })
        }
      }
      this.cancel()
    },
    echoDeleteImage(val) {
      if (val.roomId === this.roomId && val.chanel === this.chanel) {
        if (val.data.affectedRows) {
          this.$socket.client.emit('getChanelData', { id: this.roomId, chanel: this.chanel })
          this.$message({
            message: `chanel ${val.chanel} image source deleted successfully`,
            type: 'success'
          })
        }
      }
    }
  },
  created() {
    this.$socket.client.emit('getChanelData', { id: this.roomId, chanel: this.chanel })
  },
  computed: {
    getEquipmentList() {
      return this.piList
    },
    getImageSource() {
      var imageSource = []
      if (this.form.equipment !== '') {
        this.equipment = this.piList.filter((item) => {
          return item.id === this.form.equipment
        })
        for (var i = 0; i <= 3; i++) {
          var usb_id = (i + 1)
          var s = {}
          s.id = usb_id
          s.name = `port-${usb_id} ( Unknown )`
          if (this.equipment[0].status) {
            this.equipment[0].children.map((item) => {
              if (item.usb_id === usb_id) {
                s.name = item.no
              }
            })
          }
          imageSource.push(s)
        }
      }
      return imageSource
    }
  },
  methods: {
    addChanelImage() {
      if (this.form.equipment === '' || this.form.source === '') return
      this.loading = true
      this.$socket.client.emit('addChanelImage', this.form)
    },
    cancel() {
      this.loading = false
      this.dialogImagelVisible = false
      this.imageSource = []
      this.form.equipment = ''
      this.form.source = ''
    },
    changeEquipment() {
      this.form.source = ''
    },
    deleteChanelImage(val) {
      this.$socket.client.emit('deleteImage', { roomId: this.roomId, chanel: this.chanel })
    }
  }
}
/* eslint-enable */

</script>
<style scoped>
.cam {
  text-align: center;
}

.cam>>>.el-dialog {
  text-align: left;
}

.el-dialog p {
  margin-bottom: 15px;
}

</style>
