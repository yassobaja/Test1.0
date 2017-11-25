<template>
  <section id="index-login" class="container">
    <el-form @submit.native.prevent="onLogin">
      <div class="form-column">
        <h5 class="text-center">Login Form</h5>
        <div class="form-group offset-4 col-lg-4">
          <label class="col-form-label" for="email">Email</label>
          <input type="text" v-model="email" class="form-control" placeholder="johndoe@example.com" name="email" required/>
        </div>
        <div class="form-group offset-4 col-lg-4">
          <label class="col-form-label" for="password">Password</label>
          <input type="password" v-model="password" class="form-control" placeholder="Enter your password" name="password" required/>
        </div>

        <div class="form-group text-center" v-if="errorPersist">
          <span class="text-warning">{{ errorText }}</span>
        </div>

        <div class="form-group offset-4 col-lg-4 text-center">
          <button type="submit" class="btn btn-outline-primary">Login</button>
          <button type="reset" class="btn btn-outline-secondary">Clear</button>
        </div>
        <div class="form-group offset-4 col-lg-4 text-center">
          <router-link to="/register">Don't have an account? Register.</router-link>
        </div>
      </div>
    </el-form>
  </section>
</template>
<style>
</style>
<script>
import firebase from '../firebase';

export default {
  name: 'index-login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorPersist: false,
      errorText: '',
    };
  },
  methods: {
    onLogin() {
      const email = this.email;
      const password = this.password;
      firebase.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.$router.push('/');
        localStorage.setItem('userId', firebase.auth.currentUser.uid);
        if (this.errorPersist === true) {
          this.errorPersist = false;
        }
        this.$message({
          message: 'You have logged in!',
          type: 'success'
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            this.errorPersist = true;
            this.errorText = 'Email or password is incorrect.'
            break;
          case 'auth/invalid-email':            
            this.errorPersist = true;
            this.errorText = 'This email is invalid.';
            break;
        }
      });
    }
  }
}
</script>