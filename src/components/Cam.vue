<template>
  <div class="cam">
    <h1>{{ chanel }}</h1>
    <el-button v-if="status===''" type="success" icon="el-icon-plus" circle title="Add image" @click="addChanel()"></el-button>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Cam',
  props: ['id', 'chanel', 'pi'],
  data() {
    return {
      status: ''
    }
  },
  sockets: {
    chanelData(val) {
      if (val.me.id === this.id && val.me.chanel === this.chanel) {
        if(val.data.length !== 0) {

        }
      }
    }
  },
  created() {
    this.$socket.client.emit('getChanelData', { id: this.id, chanel: this.chanel })
  },
  computed: {},
  methods: {
    addChanel() {
      console.log(this.pi)
    }
  }
}
/* eslint-enable */

</script>
<style scoped lang="scss">
h1 {
  text-align: center;
}
</style>
