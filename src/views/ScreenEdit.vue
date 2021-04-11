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
      <el-row class="screen">
        <el-col v-for="item in type" :key="'screen-' + item" :span="12">
          <Cam :id="id" :chanel="item" :pi="equipmentData" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Cam from '@/components/Cam.vue'
export default {
  components: {
    Cam
  },
  props: ['no'],
  sockets: {
    roomData(val) {
      this.id = val[0].id
      this.type = val[0].type
      this.title = val[0].name + ' edit screen'
    },
    EquipmentData(val) {
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

.screen .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-color: #121820 !important;
}

.template-4 {
  .screen {
    .el-col {
      height: calc((100vh - 260px) / 2);

      &:nth-child(1) {
        border-top: 2px solid;
        border-bottom: 1px solid;
        border-left: 2px solid;
        border-right: 1px solid;
      }

      &:nth-child(2) {
        border-top: 2px solid;
        border-bottom: 1px solid;
        border-left: 1px solid;
        border-right: 2px solid;
      }

      &:nth-child(3) {
        border-top: 1px solid;
        border-bottom: 2px solid;
        border-left: 2px solid;
        border-right: 1px solid;
      }

      &:nth-child(4) {
        border-top: 1px solid;
        border-bottom: 2px solid;
        border-left: 1px solid;
        border-right: 2px solid;
      }
    }
  }
}

</style>
/* eslint-enable */
