<template>
  <div>
    <section id="index-header" class="d-flex">
      <div class="container">
        <h1>Welcome to Feel Restaurant</h1>
      </div>
    </section>
    <section id="index-menu" class="d-flex">
      <div class="container-fluid">
        <div class="row">
          <div class="col col-menu d-flex justify-content-center">
            <div>
              <h2>View our delicious menu</h2>
              <router-link tag="button" to="/menu" class="btn btn-primary">View Menu</router-link>
            </div>
          </div>
          <div class="col col-table d-flex justify-content-center">
            <div>
            <h2>Reserve our tables</h2>
            <router-link tag="button" to="/reservation" class="btn btn-primary">Reserve Table</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
#index-header {
  width: 100%;
  height: 50vh;
  padding-top: 100px;
  padding-bottom: 100px;
  align-items: center;
  background-image: url('../assets/header.jpg');
  background-size: cover;
  text-align: center;
}

#index-header h1 {
  color: #fff;
  font-weight: 700;
  text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);
}

.col-menu, .col-table {
  background-color: #e0e0e0;
  color: #fff;
  height: 50vh;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.col-menu {
  background-image: url('../assets/index-menu.jpg');
  background-size: cover;
}

.col-table {
  background-image: url('../assets/index-table.jpg');
  background-size: cover;
}

.col-menu h2, .col-table h2 {
  margin-bottom: 10px;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.btn-primary {
  cursor: pointer;
}

</style>
<script>
export default {
  name: 'index-home'
}
</script>