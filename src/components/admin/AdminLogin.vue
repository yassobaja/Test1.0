<template>
  <section id="admin-login">
    <el-form ref="loginForm">
      <el-form-item label="Email">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Login</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<style>
</style>
<script>
import firebase from '../../firebase';

export default {
  name: 'admin-login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      const email = this.email;
      const password = this.password;
      firebase.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('logged in!');
      })
      .catch((error) => {
        console.log('auth error', error);
      });
    }
  }
}
</script> 
