<template>
  <section id="index">
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
      <router-link class="navbar-brand" to="/">Restaurant</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <ul class="navbar-nav" v-if="!user">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li> 
          </ul>
          <ul class="navbar-nav" v-else>
            <li class="nav-item">
              <span class="nav-link">Welcome <b>{{ user_name }}</b> !</span>
            </li>
            <li class="nav-item">
              <router-link to="/checkout" class="nav-link">Checkout</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/orders" class="nav-link">Orders</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reservation" class="nav-link">Reservations</router-link>
            </li>
            <li class="nav-item" @click="onLogout">
              <router-link to="/" class="nav-link">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
    <!-- <footer>
      <div class="container">
        <div class="row justify-content-center">
          <span>Developed by Kaung Myat Lwin</span>
        </div>
      </div>
    </footer> -->
  </section>
</template>
<style>
#index-item, #index-login, #index-register {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 64px);
  justify-content: center;
}

.item-card {
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.item-card h5 {
  font-size: 16px;
}

.btn {
  cursor: pointer;
}

.btn:disabled {
  cursor: disabled !important;
}

.spacer {
  margin-top: 5px;
  margin-bottom: 5px;
}
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #dddddd;
  background-color: #efefef;
  padding-top: 20px;
  padding-bottom: 20px;
}

</style>
<script>
import firebase from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'index',
  created() {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user.uid;
        this.user_name = user.displayName;
      }
    });
  },
  firebase() {
    return {
      cart_items: firebase.db.ref('users').child(firebase.auth.currentUser.uid).child('cart')
    }
  },
  data() {
    return {
      visibleLoginBar: true,
      user: null,
      user_name: '',
      cart_items: [],
    }
  },
  methods: {
    onLogout() {
      firebase.auth.signOut().then(() => {
        localStorage.removeItem('userId');
        this.user = null;
      })
      .then(() => {
        this.$message({
          message: 'You have logged out!',
          type: 'success'
        });
      });
    }
  }
}
</script>