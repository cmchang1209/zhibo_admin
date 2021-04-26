<template>
  <div class="player-edit">
    <el-breadcrumb separator=" ">
      <el-breadcrumb-item>
        <a @click="goBack"><i class="el-icon-arrow-left"></i> Back</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>Screen Edit</el-breadcrumb-item>
    </el-breadcrumb>
    <h3>{{ title }}</h3>
    <el-row type="flex" justify="end" style="margin-bottom: 15px">
      <el-col :span="6" style="text-align: right;">
        <el-button type="success" round>
          <a :href="viewUrl" target="_blank" class="btn-open-view">Open screen</a>
        </el-button>
      </el-col>
    </el-row>
    <div v-if="type === 4" :class="'template-'+type">
      <T4 :roomId="id" :type="type" :piList="equipmentData" />
    </div>
    <div v-else-if="type === 5" :class="'template-'+type">
      <T5 :roomId="id" :type="type" :piList="equipmentData" />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import T4 from '@/components/template/T4.vue'
import T5 from '@/components/template/T5.vue'
export default {
  components: {
    T4,
    T5
  },
  props: ['no'],
  sockets: {
    roomData(val) {
      this.id = val[0].id
      this.type = val[0].type
      this.title = `Room name : ${val[0].name}`
    },
    EquipmentData(val) {
      //console.log(val)
      this.equipmentData = val
    }
  },
  data() {
    return {
      id: '',
      type: '',
      title: '',
      equipmentData: [],
      viewPort: 8005
    }
  },
  computed: {
    viewUrl() {
      return `http://${document.location.hostname}:${this.viewPort}?no=${this.no}`
    },
  },
  created() {
    this.$socket.client.emit('getRoomData', { no: this.no })
    this.$socket.client.emit('getEquipmentList')
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    }
  }
}

</script>
<style scoped lang="scss">
.btn-open-view {
  text-decoration: none;
}

</style>
/* eslint-enable */
