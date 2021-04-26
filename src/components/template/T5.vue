<template>
  <el-row class="screen">
    <el-col v-for="item in type" :key="'screen-' + item" :span="item<=2? 12 : 8">
      <Cam :roomId="roomId" :chanel="item" :piList="piList" />
    </el-col>
  </el-row>
</template>
<script>
/* eslint-disable */
import Cam from '@/components/Cam.vue'
export default {
  components: {
    Cam
  },
  props: ['roomId', 'type', 'piList'],
  sockets: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}

</script>
<style scoped lang="scss">
.screen .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-color: #121820 !important;

  &:nth-child(1) {
    height: calc((100vh - 260px) * 2 / 3) !important;
    height: calc(60vh-1px);
    border-top: 2px solid;
    border-bottom: 1px solid;
    border-left: 2px solid;
    border-right: 1px solid;
  }

  &:nth-child(2) {
    height: calc((100vh - 260px) * 2 / 3);
    border-top: 2px solid;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 2px solid;
  }

  &:nth-child(3) {
    height: calc((100vh - 260px) / 3);
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 2px solid;
    border-right: 1px solid;
  }

  &:nth-child(4) {
    height: calc((100vh - 260px) / 3);
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 1px solid;
    border-right: 1px solid;
  }

  &:nth-child(5) {
    height: calc((100vh - 260px) / 3);
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 1px solid;
    border-right: 2px solid;
  }
}

</style>
/* eslint-enable */
