<template>
  <div class="home">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Equipment</el-breadcrumb-item>
    </el-breadcrumb>
    <EquipmentList />
  </div>
</template>
<script>
/* eslint-disable */
import EquipmentList from '@/components/EquipmentList.vue'

export default {
  name: 'Home',
  components: {
    EquipmentList
  }
}
/* eslint-enable */

</script>
