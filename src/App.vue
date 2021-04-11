<template>
  <div id="app">
    <el-container>
      <!-- 頭部區域 -->
      <el-header>
        <router-link :to="{ name: 'Home' }" tag="a">
          <img src="./assets/img/logo_hen.png" alt="">
          <span>FIDOLIVE Management Platform</span>
        </router-link>
      </el-header>
      <!-- 頁面主體區域 -->
      <el-container class="main-container">
        <!-- 側邊欄 -->
        <el-aside :width="isCollapse? '65px' : '210px'">
          <!-- 側邊欄菜單區域 -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
            <!-- 一級菜單 -->
            <el-menu-item index="/">
              <i class="el-icon-setting"></i>
              <span slot="title">Equipment</span>
            </el-menu-item>
            <el-menu-item index="/room">
              <i class="el-icon-menu"></i>
              <span slot="title">Room</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右側內容主體 -->
        <el-main>
          <!-- 路由佔位符 -->
          <router-view :key="$route.fullPath"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view /> -->
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    activePath() {
      const path = this.$router.currentRoute.path.split('/')
      return '/' + path[1]
    }
  },
  created() {},
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
/* eslint-enable */

</script>
<style lang="scss">
body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #121820;
  height: 80px !important;

  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    font-size: 20px;
  }

  img {
    height: 50px;
  }

  span {
    margin-left: 15px;
  }
}

.main-container {

  .toggle-button {
    background-color: #222933;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: .2em;
    cursor: pointer;
    border-right: solid 1px #121820;
    border-bottom: solid 1px #121820;
  }

  .el-menu,
  .el-menu--collapse {
    border-right: solid 1px #121820;
    min-height: calc(100vh - 106px);
  }
}

.el-breadcrumb {
  margin-bottom: 15px;
}

.el-table [class*=el-table__row--level] .el-table__expand-icon {
  display: inline-block;
  width: 20px;
  line-height: 20px;
  height: 20px;
  text-align: center;
  margin-right: 3px;
}

.text-danger {
  span {
    color: #f56c6c !important;
  }
  &:hover span {
    color: #c55353 !important;
  }
}

.text-warning {
  span {
    color: #E6A23C !important;
  }
  &:hover span {
    color: #c38425 !important;
  }
}

</style>
