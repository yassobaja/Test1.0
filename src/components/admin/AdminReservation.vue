<template>
  <section id="admin-reservation">
    <div class="container">
      <h4 class="text-center admin-title">Table Reservations</h4>
      <div class="row">
          <div class="card item-card" v-for="reservation in reservations">
            <div class="row align-items-center">
              <div class="col-sm-2">
                <h5>Reserved by</h5>
                <span>{{ reservation.reservation_name }}</span>
              </div>
              <div class="col-sm-2">
                <h5>Total People</h5>
                <span>{{ reservation.total_people }}</span>
              </div>
              <div class="col-sm-2">
                <h5>Reservation Date</h5>
                <span>{{ new Date(reservation.reservation_datetime).getDate() }}</span>
                <span>.{{ new Date(reservation.reservation_datetime).getMonth() }}</span>
                <span>. {{ new Date(reservation.reservation_datetime).getFullYear() }}</span>
              </div>
              <div class="col-sm-4">
                <h5>Special Request</h5>
                <p>{{ reservation.special_request }}</p>
              </div>
              <div class="col-sm-2">
                <button class="btn btn-sm btn-danger" @click="removeReservation(reservation['.key'])">Remove Reservation</button>
              </div>
            </div>
        </div>
      </div>
      </div>
  </section>
</template>
<style>
.admin-title {
  margin-top: 20px;
  margin-bottom: 20px;
}

.item-card {
  width: 100%;
  padding: 10px;
  border-radius: 0;
}

.item-card h5 {
  font-size: 16px;
}
</style>
<script>
import firebase from '../../firebase';

export default {
  name: 'admin-reservation',
  firebase: {
    reservations: firebase.db.ref('reservation')
  },
  methods: {
    removeReservation(key) {
      this.$firebaseRefs.reservations.child(key).remove();
    }
  }
}

</script>
