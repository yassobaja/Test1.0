<template>
  <section id="index-reservation">
    <div class="container">
      <div class="text-center">
        <h4>Reserve Table</h4>
        <div class="spacer"></div>
        <p>Check in your time and reserve tables. We will soon confirm via Telephone or Email.</p>
      </div>
      <el-tabs tab-position="top">
        <el-tab-pane label="Reserve Tables">
          <div class="row justify-content-center">
            <form @submit.prevent="onReservationSubmit">
              <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="reservation_name" maxlength="100" class="form-control" placeholder="John Doe" required pattern="^[a-zA-Z ]+$" title="Special characters (*, / #) and numbers are not allowed.">
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <div class="input-group">
                  <span class="input-group-addon">+959</span>
                  <input type="tel" v-model="phone_number" class="form-control" placeholder="969786696" name="Phone Number" required minlength="9" maxlength="9" pattern="[0-9]{1,9}\d$" title="Please enter Myanmar Phone Number"/>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="d-block">Total People</label>
                  <el-input-number :min="1" v-model="total_people"></el-input-number>
                </div>
                <div class="form-group col-md-6">
                  <label>Date and Time</label>
                  <el-date-picker style="width: 100%" v-model="reservation_datetime" type="datetime" placeholder="Select date and time" format="dd/mm/yy HH:mm">
                  </el-date-picker>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label>Special Reqeusts</label>
                  <textarea v-model="special_request" class="form-control" placeholder="Please write any special request."></textarea>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Reserve Table</button>
              </div>
            </form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Your reserved table">
          <div class="container">
            <div class="card item-card" v-if="reservation_user['.value'] !== null || !reservation_user">
              <div class="row align-items-center">
                <div class="col-sm-2">
                  <h5>Reserved by</h5>
                  <span>{{ reservation_user.reservation_name }}</span>
                </div>
                <div class="col-sm-2">
                  <h5>Total People</h5>
                  <span>{{ reservation_user.total_people }}</span>
                </div>
                <div class="col-sm-2">
                  <h5>Reservation Date</h5>
                  <span>{{ new Date(reservation_user.reservation_datetime).getDate() }}</span>
                  <span>.{{ new Date(reservation_user.reservation_datetime).getMonth() }}</span>
                  <span>. {{ new Date(reservation_user.reservation_datetime).getFullYear() }}</span>
                </div>
                <div class="col-sm-4">
                  <h5>Special Request</h5>
                  <p>{{ reservation_user.special_request }}</p>
                </div>
                <div class="col-sm-2">
                  <button class="btn btn-sm btn-danger" @click="removeReservation(reservation_user['.key'])">Remove Reservation</button>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              You haven't reserved any tables.
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<style scoped>
#index-reservation {
  margin-top: 50px;
}
.item-card {
padding: 10px;
margin-top: 5px;
margin-bottom: 5px;
}

.item-card p {
  margin: 0;
}

.item-card h5 {
  font-size: 16px;
}
</style>
<script>
import firebase from '../firebase';

export default {
  name: 'index-reservation',
  firebase() {
    return {
      reservation: firebase.db.ref('reservation'),
      reservation_user: {
        source: firebase.db.ref('reservation').child(firebase.auth.currentUser.uid),
        asObject: true
      }
    }
  },
  data() {
    return {
      reservation_name: '',
      phone_number: '',
      total_people: null,
      reservation_datetime: '',
      special_request: '',
    }
  },
  methods: {
    onReservationSubmit() {
      this.$firebaseRefs.reservation.child(firebase.auth.currentUser.uid).set({
          reservation_name: this.reservation_name,
          phone_number: this.phone_number,
          total_people: this.total_people,
          reservation_datetime: Date.parse(this.reservation_datetime.toString()),
          special_request: this.special_request,
      }).then(() => {
        this.$message({
          message: 'Table reserved.',
          type: 'success'
        });
        this.reservation_name ='';
        this.phone_number = '';
        this.total_people = null;
        this.reservation_datetime = '';
        this.special_request = '';
      });
    },
    removeReservation(key) {
      this.$firebaseRefs.reservation.child(key).remove();
    }
  }
};
</script>
