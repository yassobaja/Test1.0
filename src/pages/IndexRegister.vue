<template>
  <section id="index-register" class="container">
    <el-form @submit.native.prevent="onUserRegister">
      <div class="form-column">
        <h5 class="text-center">Register Form</h5>
        <div class="form-group offset-4 col-lg-4">
          <label class="col-form-label" for="email">Name</label>
          <input type="text" v-model="name" maxlength="100" class="form-control" placeholder="John Doe" name="name" pattern="^[a-zA-Z ]+$" title="Special characters (*, / #) and numbers are not allowed."/>
        </div>
        <div class="form-group offset-4 col-lg-4">
          <label class="col-form-label" for="email">Email</label>
          <input type="email" v-model="email" class="form-control" placeholder="johndoe@example.com" name="email" required/>
        </div>
        <div class="form-group offset-4 col-lg-4">
          <label class="col-form-label" for="password">Password</label>
          <input type="password" v-model="password" class="form-control" placeholder="Enter your password" name="password" required/>
        </div>
        <div class="form-group offset-4 col-lg-4">
          <label class="col-form-label" for="email">Phone Number</label>
          <div class="input-group">
            <span class="input-group-addon">+959</span>
            <input type="tel" v-model="phone_number" class="form-control" placeholder="969786696" name="Phone Number" required minlength="9" maxlength="9" pattern="[0-9]{1,9}\d$" title="Please enter Myanmar Phone Number"/>
          </div>
        </div>

        <div class="form-group text-center" v-if="errorPersist">
          <span class="text-warning">{{ errorText }}</span>
        </div>

        <div class="form-group offset-4 col-lg-4 text-center">
          <button type="submit" class="btn btn-outline-primary">Register</button>
          <button type="reset" class="btn btn-outline-secondary">Clear</button>
        </div>
        <div class="form-group offset-4 col-lg-4 text-center">
          <router-link to="/login">Have an account? Login.</router-link>
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
  name: 'index-register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone_number: '',
      errorPersist: false,
      errorText: ''
    };
  },
  methods: {
    onUserRegister() {
      firebase.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        user.updateProfile({
          displayName: this.name
        });
        firebase.db.ref('users').child(user.uid).set({
          user_name: this.name,
          user_email: this.email,
          user_phone_number: this.phone_number
        });
        if (this.errorPersist === true) {
          this.errorPersist = false;
        }
        this.$message({
          message: 'Register successful!',
          type: 'success'
        });
        this.$router.push('/');
        localStorage.setItem('userId', user.uid);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorPersist = true;
            this.errorText = 'This email is already in use.';
            break;
          case 'auth/invalid-email':            
            this.errorPersist = true;
            this.errorText = 'This email is invalid.';
            break;
          case 'auth/weak-password':
            this.errorPersist = true;
            this.errorText = 'Use password over 8 characters.';
            break;
        }
      });
    }
  }
}
</script>