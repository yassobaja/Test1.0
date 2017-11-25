<template>
  <section id="admin" class="container-fluid">
    <div class="row no-gutter full-height">
      <aside class="col-lg-2">
        <el-menu class="full-height" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <span>Menu Management</span>
            </template>
            <el-menu-item index="categories">
              <span>Categories</span>
            </el-menu-item>
            <el-menu-item index="items">
              <span>Menu Items</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>Table Management</span>
            </template>
            <el-menu-item index="reservation">Reservation</el-menu-item>
          </el-submenu>
          <el-menu-item index="orders">
            <span>Orders</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <main class="col-lg-10">
        <router-view></router-view>
      </main>
    </div>
  </section>
</template>
<style>
  #admin {
    height: 100vh;
  }

  aside {
    padding: 0 !important;
  }

  .full-height {
    height: 100vh;
  }

</style>
<script>
import firebase from '../firebase';

export default {
  name: 'admin',
  data() {
    return {
      email: '',
      password: '',
      fullPath: this.$route.fullPath,
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next();
  }
}

</script>
